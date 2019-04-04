import { Answer } from "./Answer";
import { v4 as uuid } from "uuid"

export class Question {

    public id: string
    public key: string = uuid()
    public correctAnswerId: string

    constructor(
        public text: string,
        public transcription: string,
        public type: string,
        public correctAnswerIndex: number,
        public answers: Answer[]
    ) {}

    public updateCorrectAnswerIndex() {
        this.correctAnswerIndex = -1
        
        if (this.answers && this.correctAnswerId) {
            this.answers.forEach((answer, index) => {
                if (answer.id == this.correctAnswerId) {
                    this.correctAnswerIndex = index
                }
            })
        }
    }

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