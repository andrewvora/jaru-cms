import * as React from 'react'
import { SingleLineInput } from '../SingleLineInput'
import { SubmitButton } from '../SubmitButton'
import { nameof } from '../../util/Util'

interface Props {
    onSignIn(username: string, password: string): void
}

interface State {
    username: string
    password: string
}

export class LoginForm extends React.Component<Props, State> {
    
    state: Readonly<State> = {
        username: '',
        password: ''
    }

    onFieldUpdated(name: string, event: React.FormEvent<HTMLInputElement>) {
        const value = event.currentTarget.value
        this.setState({ [name]: value } as any)
    }

    render() {
        return <form>
            <SingleLineInput value={this.state.username} 
                hint='Username'
                name={ nameof<State>('username') }
                type='text'
                onChange={this.onFieldUpdated.bind(this)}/>
            <SingleLineInput value={this.state.password} 
                hint='Password'
                name={ nameof<State>('password') }
                type='password'
                onChange={this.onFieldUpdated.bind(this)}/>
            <br/>
            <SubmitButton enabled={true} text='Sign In' onClick={
                () => this.props.onSignIn(this.state.username, this.state.password)
            }/>
        </form>
    }
}