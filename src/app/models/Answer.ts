import { v4 as uuid } from "uuid"

export class Answer {

    constructor(public text: string,
                public key: string) {}

    static create(text: string) {
        return new Answer(text, uuid())
    }
}