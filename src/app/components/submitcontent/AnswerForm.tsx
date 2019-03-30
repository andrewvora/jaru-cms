import * as React from 'react'
import { RemovableSingleLineInput } from '../RemovableSingleLineInput'
import { Answer } from '../../models/Answer'

interface Props {
    answer: Answer
    index: number
    onAnswerUpdated(index: number, answer: Answer): void
    onRemoveAnswer(index: number): void
}

export class AnswerForm extends React.Component<Props, {}> {

    onFieldUpdated(name: string, event: React.FormEvent<HTMLInputElement>) {
        const value = event.currentTarget.value
        const answer = Answer.create(value)
            answer.key = this.props.answer.key
            this.props.onAnswerUpdated(this.props.index, answer)
    }

    onRemoveClicked() {
        const index = this.props.index
        this.props.onRemoveAnswer(index)
    }

    render() {
        return <RemovableSingleLineInput
            type='text' 
            name='value'
            value={ this.props.answer.text } 
            hint='ex. Hello' 
            onRemove={this.onRemoveClicked.bind(this)}
            onChange={this.onFieldUpdated.bind(this)}/>
    }
}