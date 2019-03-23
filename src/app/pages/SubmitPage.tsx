import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { SubmitForm } from '../components/submitcontent/SubmitForm'
import { QuestionSet } from '../models/QuestionSet'

interface Props extends RouteComponentProps {
}

class SubmitPage extends React.Component<Props, {}> {

    onSubmitted() {
        console.log("Submitted!")
        this.props.history.push('view');
    }

    render() {
        return <div className="container">
            <div className="col-sm-8 mx-auto">
                <h1 className="mb-4">Create Question Set</h1>
                <SubmitForm 
                    questionSet={QuestionSet.create('', '', '', [])}
                    onSubmitted={this.onSubmitted.bind(this)}/>
            </div>
        </div>
    }
}

export default withRouter(SubmitPage)