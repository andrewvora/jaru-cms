import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { QuestionSetList } from '../components/viewsets/QuestionSetList'

interface Props extends RouteComponentProps {}

class ViewPage extends React.Component<Props, {}> {
    render() {
        return <div>
            <h1>View</h1>
            <a href='/submit'>
                + Add
            </a>
            <QuestionSetList/>
        </div>
    }
}

export default withRouter(ViewPage)