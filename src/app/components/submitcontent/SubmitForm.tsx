import * as React from 'react'
import { SubmitButton } from '../SubmitButton'
import { QuestionSetForm } from './QuestionSetForm'
import { QuestionSet } from '../../models/QuestionSet'
import { DtoMapper } from '../../models/DtoMapper'
import axios from 'axios';
import { Session } from '../../session/Session';

declare var API_HOST: string

interface Props {
    questionSet: QuestionSet
    onSubmitted(): void
}

interface State {
    questionSet: QuestionSet,
    formEnabled: boolean
}

export class SubmitForm extends React.Component<Props, State> {

    state: Readonly<State> = {
        questionSet: undefined,
        formEnabled: false
    }

    private readonly session = new Session()

    setUpdated(set: QuestionSet) {
        this.setState({ 
            formEnabled: true,
            questionSet: set 
        })
    }

    private afterRequest() {
        this.setState({ formEnabled: true })
        this.props.onSubmitted() 
    }

    submit() {
        this.setState({ formEnabled: false })

        const set = this.state.questionSet
        const mapper = new DtoMapper()
        const result = mapper.mapToDtos(set)

        const config = {
            headers: { 'Authorization': this.session.getAuthHeader() }
        }

        // create set on server
        const setJson = JSON.stringify(result.setDto)
        const submitUrl = `${API_HOST}/content/v1/set`
        
        // create text resources on server
        const textResources = result.textResources
        const textResourcesJson = JSON.stringify(textResources)
        const batchCreateUrl = `${API_HOST}/content/v1/text/batch`

        const submitSetPromise = axios.post(submitUrl, setJson, config)
        const submitTextPromise = axios.post(batchCreateUrl, textResourcesJson, config)

        axios.all([submitSetPromise, submitTextPromise]).then(() => {
             this.afterRequest()
        }).catch((error) => {
            console.log(error)
            this.afterRequest()
        })
    }

    render() {
        return <form>
            <QuestionSetForm 
                questionSet={this.props.questionSet} 
                onSetUpdated={this.setUpdated.bind(this)}/>

            <SubmitButton 
                enabled={this.state.formEnabled} 
                text='Submit' 
                onClick={this.submit.bind(this)}/>
        </form>
    }
}