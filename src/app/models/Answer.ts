export class Answer {

    constructor(public text: string) {}

    static create(text: string) {
        return new Answer(text)
    }
}