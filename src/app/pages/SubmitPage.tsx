import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { SubmitForm } from '../components/submitcontent/SubmitForm'
import { QuestionSet } from '../models/QuestionSet'

interface Props extends RouteComponentProps {
    // questionSet: QuestionSet
}

class SubmitPage extends React.Component<Props, {}> {

    render() {
        return <div>
            <h1>Submit</h1>
            <SubmitForm 
                questionSet={QuestionSet.create('', '', '', [])}
                onSubmitted={() => { console.log('Submitted!') }}/>
        </div>
    }
}

export default withRouter(SubmitPage)