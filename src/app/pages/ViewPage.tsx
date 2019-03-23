import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { QuestionSetList } from '../components/viewsets/QuestionSetList'

interface Props extends RouteComponentProps {}

class ViewPage extends React.Component<Props, {}> {
    render() {
        return <div className="container">
            <div className="col-sm-8 mx-auto">
                <h1 className="mb-2">View</h1>
                <a className="btn btn-primary mb-4" href='/submit'>
                    + Add
                </a>
                <QuestionSetList/>
            </div>
        </div>
    }
}

export default withRouter(ViewPage)