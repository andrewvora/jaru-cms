import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { QuestionSetList } from '../components/viewsets/QuestionSetList'
import { QuestionSet } from '../models/QuestionSet';

interface Props extends RouteComponentProps {}

class ViewPage extends React.Component<Props, {}> {
    openSet(set: QuestionSet) {
        this.props.history.push('submit', {
            set: set
        })
    }

    render() {
        return <div className="container">
            <div className="col-sm-8 mx-auto">
                <h1 className="mb-2">View</h1>
                <a className="btn btn-primary mb-4" href='/submit'>
                    + Add
                </a>
                <QuestionSetList openSet={this.openSet.bind(this)}/>
            </div>
        </div>
    }
}

export default withRouter(ViewPage)