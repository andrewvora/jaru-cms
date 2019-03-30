import { Answer } from "./Answer";

export class Question {

    constructor(
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
            question, 
            transcript, 
            questionType, 
            correctAnswerIndex, 
            answers)
    }
}