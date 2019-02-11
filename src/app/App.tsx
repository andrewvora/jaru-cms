import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SubmitPage from './pages/SubmitPage'
import ViewPage from './pages/ViewPage'
import { Session } from './session/Session'

const session = new Session()

ReactDOM.render(
    <Router>
        <React.Fragment>
            <Route path='/' exact render={ () => (
                session.isLoggedIn() ? 
                <Redirect to='/view'/> : 
                <LoginPage/>
            )}/>
            <Route path='/submit' render={ () => (
                !session.isLoggedIn() ? 
                <Redirect to='/'/> : 
                <SubmitPage/>
            )}/>
            <Route path='/view' render={ () => (
                !session.isLoggedIn() ? 
                <Redirect to='/'/> : 
                <ViewPage/>
            )}/>
        </React.Fragment>
    </Router>,
    document.getElementById('root')
)

declare let module: any
if (module.hot) {
    module.hot.accept()
}