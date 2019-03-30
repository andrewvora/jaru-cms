import * as React from 'react'
import { RemovableSingleLineInput } from '../RemovableSingleLineInput'
import { nameof } from '../../util/Util'
import { Answer } from '../../models/Answer'

interface Props {
    answer: Answer
    index: number
    onAnswerUpdated(index: number, answer: Answer): void
    onRemoveAnswer(index: number): void
}

interface State {
    value: string
}

export class AnswerForm extends React.Component<Props, State> {
    state: Readonly<State> = {
        value: this.props.answer.text || ""
    }

    onFieldUpdated(name: string, event: React.FormEvent<HTMLInputElement>) {
        const value = event.currentTarget.value
        this.setState({ [name]: value } as any, () => {
            const answer = Answer.create(value)
            answer.key = this.props.answer.key
            this.props.onAnswerUpdated(this.props.index, answer)
        })
    }

    onRemoveClicked() {
        const index = this.props.index
        this.props.onRemoveAnswer(index)
    }

    render() {
        return <RemovableSingleLineInput
            type='text' 
            name={ nameof<State>('value') } 
            value={ this.state.value } 
            hint='ex. Hello' 
            onRemove={this.onRemoveClicked.bind(this)}
            onChange={this.onFieldUpdated.bind(this)}/>
    }
}