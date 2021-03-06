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
            const answer1 = Answer.create("1")
            const answer2 = Answer.create("2")
            const answers = [answer1, answer2]
            const question = Question.create(
                questionType, 
                text,
                transcript,
                answers)
    
            expect(question.text).to.equal(text)
            expect(question.transcription).to.equal(transcript)
            expect(question.type).to.equal(questionType)
            expect(question.answers[0]).to.equal(answer1)
            expect(question.answers[1]).to.equal(answer2)
        })
    })
})