import * as React from 'react'
import { Question } from '../../models/Question'
import { Answer } from '../../models/Answer'
import { SingleLineInput } from '../SingleLineInput'
import { AnswerForm } from './AnswerForm'
import { nameof } from '../../util/Util'
import { RadioGroup } from '../RadioGroup'
import { NumberInput } from '../NumberInput'

interface Props {
    question: Question,
    index: number,
    onQuestionUpdated(index: number, question: Question): void
    onRemoveQuestion(index: number): void
}

interface State {
    question: string,
    transcript: string,
    questionType: string,
    correctAnswerIndex: number,
    answers: Answer[]
}

const QUESTION_TYPES = ['single_input', 'multiple_choice', 'free_form']

export class QuestionForm extends React.Component<Props, State> {

    state: Readonly<State> = {
        question: this.props.question.question,
        transcript: this.props.question.transcript,
        questionType: this.props.question.questionType,
        correctAnswerIndex: this.props.question.correctAnswerIndex,
        answers: this.props.question.answers
    }

    stateUpdated() {
        const updatedQuestion = Question.create(
            this.state.questionType,
            this.state.question,
            this.state.transcript,
            this.state.correctAnswerIndex,
            this.state.answers)

        updatedQuestion.key = this.props.question.key
            
        this.props.onQuestionUpdated(this.props.index, updatedQuestion)
    }

    removeQuestion() {
        this.props.onRemoveQuestion(this.props.index)
    }

    addAnswer() {
        this.setState((prevState) => {
            const placeholderAnswer = Answer.create('')
            const updatedAnswers = prevState.answers.slice()
            updatedAnswers.push(placeholderAnswer)

            return {
                answers: updatedAnswers
            }
        }, this.stateUpdated)
    }

    removeAnswer(index: number) {
        this.setState((prevState) => {
            const updatedAnswers = prevState.answers.slice()
            updatedAnswers.splice(index, 1)

            return {
                answers: updatedAnswers
            }
        }, this.stateUpdated)
    }

    answerUpdated(index: number, answer: Answer) {
        this.setState((prevState) => {
            const updatedAnswers = prevState.answers.slice()
            updatedAnswers[index] = answer

            return {
                answers: updatedAnswers
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

    onQuestionTypeSelected(type: string) {
        this.setState(() => {
            return {
                questionType: type
            }
        }, this.stateUpdated)
    }

    render() {
        return <div>
            <h5>
                Question {this.props.index + 1}
                <button 
                    type="button" 
                    className="float-right btn btn-sm btn-link"
                    onClick={this.removeQuestion.bind(this)}>Delete</button>
            </h5>

            <SingleLineInput
                type='text'
                name={ nameof<State>('question') }
                value={ this.state.question }
                hint='Question'
                onChange={this.onFieldUpdated.bind(this)}/>

            <SingleLineInput
                type='text'
                name={ nameof<State>('transcript') }
                value={ this.state.transcript }
                hint='Transcript'
                onChange={this.onFieldUpdated.bind(this)}/>

            <NumberInput
                label="Correct Answer Index (0-based)"
                name={ nameof<State>('correctAnswerIndex') }
                min={-1}
                max={100}
                disabled={ this.state.questionType !== 'multiple_choice' }
                value={ this.state.correctAnswerIndex }
                onChange={this.onFieldUpdated.bind(this)}/>

            <RadioGroup 
                options={QUESTION_TYPES}
                onOptionSelected={this.onQuestionTypeSelected.bind(this)}/>

            <h5 className="mt-4">
                Answers
                <button type="button" 
                    className="btn btn-link" 
                    onClick={this.addAnswer.bind(this)}>
                    Add
                </button>
            </h5>

            <ul>
                { this.state.answers.map((answer, index) => {
                    return <div key={answer.key}>
                        <AnswerForm
                            answer={answer}
                            index={index}
                            onRemoveAnswer={this.removeAnswer.bind(this)}
                            onAnswerUpdated={this.answerUpdated.bind(this)}/>
                    </div>
                }) }
            </ul>

            <div className="border-top my-4"/>
        </div>
    }
}