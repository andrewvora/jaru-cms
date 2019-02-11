import { QuestionSet } from "./QuestionSet"
import { Question } from "./Question"
import { Answer } from "./Answer"
import { v4 as uuid } from "uuid"

class Pair {
    constructor(
        public dto: any, 
        public textDtos: any[]) {}
}

export class DtoBundle {
    constructor(
        public setDto: any,
        public textResources: any[]
    ) {}
}

export class DtoMapper {

    mapToDtos(set: QuestionSet): DtoBundle {
        const descriptionTextDto = this.createTextResourceDto(set.description)
        const titleTextDto = this.createTextResourceDto(set.title)

        const questionDtos: any[] = []
        const textDtos: any[] = []
        if (set.questions && set.questions.length > 0) {
            set.questions.forEach((question) => {
                const dtoPair = this.mapToQuestionDto(question)
                questionDtos.push(dtoPair.dto)
                textDtos.push(dtoPair.textDtos)
            })
        }

        const setDto = {
            setId: uuid(),
            difficulty: set.difficulty,
            titleResourceName: titleTextDto.resourceName,
            descriptionResourceName: descriptionTextDto.resourceName,
            questions: questionDtos
        }

        const textResourceDtos: any[] = [descriptionTextDto, titleTextDto]
            .concat(textDtos)

        return new DtoBundle(setDto, textResourceDtos)
    }

    private mapToQuestionDto(question: Question): Pair {
        const questionTextResource = this.createTextResourceDto(question.question)
        const descriptionTextResource = this.createTextResourceDto(question.transcript)

        const answersDto: any[] = []
        const answerTextDto: any[] = []
        if (question.answers && question.answers.length > 0) {
            question.answers.forEach((answer) => {
                const answerPair = this.mapToAnswerDto(answer)
                answersDto.push(answerPair.dto)
                answerTextDto.push(answerPair.textDtos)
            })
        }

        const dto = {
            questionId: uuid(),
            textResName: questionTextResource.resourceName,
            transcriptionResName: descriptionTextResource.resourceName,
            questionType: '', // TODO
            correctAnswerId: '', // TODO
            answers: answersDto
        }

        // collect text resource DTOs into one array
        const textDtos = [questionTextResource, descriptionTextResource]
            .concat(answerTextDto)

        return new Pair(dto, textDtos)
    }

    private mapToAnswerDto(answer: Answer): Pair {
        const answerTextResourceDto = this.createTextResourceDto(answer.text)
        const textDtos = [answerTextResourceDto]
        const dto = {
            answerId: uuid(),
            textResName: answerTextResourceDto.resourceName
        }

        return new Pair(dto, textDtos)
    }

    private createTextResourceDto(value: string): any {
        return {
            resourceName: uuid(),
            text: value,
            localeId: 'en-US'
        }
    }
}
