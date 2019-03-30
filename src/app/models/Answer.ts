import { v4 as uuid } from "uuid"

export class Answer {

    public id: string
    public key: string = uuid()

    constructor(public text: string) 
    {}

    static create(text: string) {
        return new Answer(text)
    }
}