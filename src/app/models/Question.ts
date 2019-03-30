import { Answer } from "./Answer";
import { v4 as uuid } from "uuid"

export class Question {

    constructor(
        public key: string,
        public question: string,
        public transcript: string,
        public questionType: string,
        public correctAnswerIndex: number,
        public answers: Answer[]
    ) {}

    static create(
        questionType: string,
        question: string, 
        transcript: string, 
        correctAnswerIndex: number,
        answers: Answer[]) {
        return new Question(
            uuid(),
            question, 
            transcript, 
            questionType, 
            correctAnswerIndex, 
            answers)
    }
}