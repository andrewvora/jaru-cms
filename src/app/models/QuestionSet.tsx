import { Question } from "./Question";

export class QuestionSet {

    constructor(
        public difficulty: string,
        public title: string,
        public description: string,
        public questions: Array<Question>
    ) {}

    static create(
        difficulty: string,
        title: string,
        description: string,
        questions: Array<Question>) {
        
        return new QuestionSet(difficulty, title, description, questions)
    }
}