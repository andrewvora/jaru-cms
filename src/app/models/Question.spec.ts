import { Question } from "./Question"
import { Answer }  from "./Answer"
import { expect } from "chai"
import "mocha"


describe('Question', () => {
    describe('create', () => {
        it('should set all fields', () => {
            const text = "How are you?"
            const questionType = "multiple_choice"
            const transcript = "A typical question asked with no sincerity"
            const correctAnswerIndex = 2
            const answer1 = Answer.create("1")
            const answer2 = Answer.create("2")
            const answers = [answer1, answer2]
            const question = Question.create(
                questionType, 
                text,
                transcript, 
                correctAnswerIndex, 
                answers)
    
            expect(question.text).to.equal(text)
            expect(question.transcription).to.equal(transcript)
            expect(question.type).to.equal(questionType)
            expect(question.correctAnswerIndex).to.equal(correctAnswerIndex)
            expect(question.answers[0]).to.equal(answer1)
            expect(question.answers[1]).to.equal(answer2)
        })
    })

    describe('updateCorrectAnswerIndex', () => {
        it('sets index to -1 if correct answer not found', () => {
            const answer = Answer.create("")
            answer.id = "4"
            const question = Question.create(null, null, null, null, [answer])
            question.correctAnswerId = "5"
            question.updateCorrectAnswerIndex()

            expect(question.correctAnswerIndex).to.equal(-1)
        })

        it('handles nulls', () => {
            const question = Question.create(null, null, null, null, null)
            question.updateCorrectAnswerIndex()
            expect(question.correctAnswerIndex).to.equal(-1)
        })
    
        it('sets index to correct answer index when found', () => {
            const answer1 = Answer.create("")
            answer1.id = "4"
            const answer2 = Answer.create("")
            answer2.id = "5"
            const question = Question.create(null, null, null, null, [answer1, answer2])
            question.correctAnswerId = answer2.id
            question.updateCorrectAnswerIndex()

            expect(question.correctAnswerIndex).to.equal(1)
        })
    })
})