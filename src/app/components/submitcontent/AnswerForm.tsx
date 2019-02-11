import * as React from 'react'
import { SingleLineInput } from '../SingleLineInput'
import { nameof } from '../../util/Util'
import { Answer } from '../../models/Answer'

interface Props {
    answer: Answer
    onAnswerUpdated(answer: Answer): void
}

interface State {
    value: string
}

export class AnswerForm extends React.Component<Props, State> {
    state: Readonly<State> = {
        value: ''
    }

    onFieldUpdated(name: string, event: React.FormEvent<HTMLInputElement>) {
        const value = event.currentTarget.value
        this.setState({ [name]: value } as any, () => {
            const answer = this.props.answer || Answer.create(value)
            this.props.onAnswerUpdated(answer)
        })
    }

    render() {
        return <SingleLineInput
            type='text' 
            name={ nameof<State>('value') } 
            value={ this.state.value } 
            hint='Text Resource Value' 
            onChange={this.onFieldUpdated.bind(this)}/>
    }
}