import { Answer } from "./Answer"
import { expect } from "chai"
import "mocha"

describe('constructor', () => {
    it('should set fields', () => {
        const text = "This is the answer"
        const answer = new Answer(text)
        expect(answer.text).to.equal(text) 
    })
})