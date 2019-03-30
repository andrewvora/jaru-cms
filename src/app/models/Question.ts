import { Answer } from "./Answer";
import { v4 as uuid } from "uuid"

export class Question {

    public id: string
    public key: string = uuid()

    constructor(
        public text: string,
        public transcription: string,
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
            question, 
            transcript, 
            questionType, 
            correctAnswerIndex, 
            answers)
    }
}