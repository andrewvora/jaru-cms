import * as React from 'react'
import { QuestionSet } from '../../models/QuestionSet'
import { Question } from '../../models/Question'
import { SingleLineInput } from '../SingleLineInput'
import { RadioGroup } from '../RadioGroup'
import { QuestionForm } from './QuestionForm'
import { nameof } from '../../util/Util'

interface Props {
    questionSet: QuestionSet
    onSetUpdated(questionSet: QuestionSet): void
}

interface State {
    difficulty: string,
    title: string,
    description: string,
    questions: Question[]
}

const DIFFICULTIES = ['beginner', 'intermediate', 'advanced', 'unrated']

export class QuestionSetForm extends React.Component<Props, State> {
    state: Readonly<State> = {
        difficulty: this.props.questionSet.difficulty,
        title: this.props.questionSet.title,
        description: this.props.questionSet.description,
        questions: this.props.questionSet.questions
    }

    stateUpdated() {
        const updatedSet = QuestionSet.create(
            this.state.difficulty,
            this.state.title,
            this.state.description,
            this.state.questions
        )
        this.props.onSetUpdated(updatedSet)
    }

    addQuestion() {
        this.setState((prevState) => {
            const placeholder = Question.create('', '', '', -1, [])
            const updatedQuestions = prevState.questions.slice()
            updatedQuestions.push(placeholder)
            return {
                questions: updatedQuestions
            }
        }, this.stateUpdated)
    }

    questionUpdated(index: number, question: Question) {
        this.setState((prevState) => {
            const updatedQuestions = prevState.questions.slice()
            updatedQuestions[index] = question
            return {
                questions: updatedQuestions
            }
        }, this.stateUpdated)
    }

    onFieldUpdated(name: string, event: React.FormEvent<HTMLInputElement>) {
        const value = event.currentTarget.value
        this.setState(() => {
            return {
                [name]: value
            } as any
        }, this.stateUpdated)
    }

    onDifficultySelected(difficulty: string) {
        this.setState(() => {
            return {
                difficulty: difficulty
            }
        }, this.stateUpdated)
    }

    render() {
        return <div>
            <SingleLineInput
                type='text'
                name={ nameof<State>('title') }
                value={ this.state.title }
                hint='Title'
                onChange={this.onFieldUpdated.bind(this)} />

            <SingleLineInput
                type='text'
                name={ nameof<State>('description') }
                value={ this.state.description }
                hint='Description'
                onChange={this.onFieldUpdated.bind(this)} />

            <RadioGroup
                options={ DIFFICULTIES }
                onOptionSelected={this.onDifficultySelected.bind(this)}/>

            <ul>
                { this.state.questions.map((question, index) => {
                    return <li key={index}>
                        <QuestionForm
                        question={question}
                        onQuestionUpdated={this.questionUpdated.bind(this)}/>
                    </li>
                }) }
            </ul>

            <a onClick={this.addQuestion.bind(this)}>Add Question</a>
        </div>
    }
}