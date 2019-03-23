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
        const enabled = 
            set.title && 
            set.difficulty &&
            set.questions && set.questions.length > 0

        this.setState({ 
            formEnabled: enabled,
            questionSet: set 
        })
    }

    private onSuccessfulSubmission() {
        this.setState({ formEnabled: true })
        this.props.onSubmitted() 
    }

    private onFailedSubmission(error: any) {
        this.setState({ formEnabled: true })
        alert(`Failed to post content: ${error}`)
    }

    submit() {
        this.setState({ formEnabled: false })

        const set = this.state.questionSet
        const mapper = new DtoMapper()
        const result = mapper.mapToDtos(set)

        const config = {
            headers: { 
                'Authorization': this.session.getAuthHeader(),
                'Content-Type': 'application/json'
            }
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

        console.log(setJson)
        console.log(textResourcesJson)

        axios.all([submitSetPromise, submitTextPromise]).then(() => {
             this.onSuccessfulSubmission()
        }).catch((error) => {
            console.log(error)
            this.onFailedSubmission(error)
        })
    }

    render() {
        return <form>
            <QuestionSetForm 
                questionSet={this.props.questionSet} 
                onSetUpdated={this.setUpdated.bind(this)}/>

            <p className="mb-4"></p>
            
            <button 
                type="button"
                disabled={!this.state.formEnabled}
                onClick={this.submit.bind(this)}
                className="btn btn-primary mb-4">
                Submit    
            </button>
        </form>
    }
}