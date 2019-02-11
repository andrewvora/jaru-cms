import * as React from 'react'
import { LoginForm } from '../components/login/LoginForm'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Session } from '../session/Session'
import axios from 'axios'

declare var API_HOST: string

interface Props extends RouteComponentProps {}

class LoginPage extends React.Component<Props, {}> {
    static readonly checkUrl = `${API_HOST}/content/v1/check`

    onSignInError(error: string) {
        alert(`${error}`)
    }

    signIn(username: string, password: string) {
        axios.get(LoginPage.checkUrl, {
                headers: { 'Authorization': `Basic ${btoa(`${username}:${password}`)}` }
            })
            .then((response) => {
                if (response.status == 200) {
                    const session = new Session();
                    session.saveCredentials(username, password);
                    this.props.history.push('view');
                } else {
                    this.onSignInError('Invalid credentials. Try again')
                }
            })
            .catch((error) => {
                this.onSignInError(`Request failed with ${error.response.status}`)
            })
    }

    render() {
        return <div>
            <h1>Sign In</h1>
            <LoginForm onSignIn={this.signIn.bind(this)}/>
        </div>
    }
}

export default withRouter(LoginPage)