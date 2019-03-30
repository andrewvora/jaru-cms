import { QuestionSet } from "./QuestionSet"
import { Question } from "./Question"
import { expect } from "chai"
import { mock } from "ts-mockito"
import "mocha"

describe('QuestionSet', () => {
    it('should set all fields', () => {
        const difficulty = "advanced"
        const title = "Set 1"
        const description = "A set of questions"
        const question = mock(Question)
        const questions = [question]
        const set = QuestionSet.create(
            difficulty,
            title,
            description,
            questions
        )

        expect(set.title).to.equal(title)
        expect(set.difficulty).to.equal(difficulty)
        expect(set.description).to.equal(description)
        expect(set.questions[0]).to.equal(question)
    })
})