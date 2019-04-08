import { Answer } from "./Answer";
import { v4 as uuid } from "uuid"

export class Question {

    public id: string
    public key: string = uuid()

    constructor(
        public text: string,
        public transcription: string,
        public type: string,
        public answers: Answer[]
    ) {}

    static create(
        questionType: string,
        question: string, 
        transcript: string,
        answers: Answer[]) {
        return new Question(
            question, 
            transcript, 
            questionType,
            answers)
    }
}