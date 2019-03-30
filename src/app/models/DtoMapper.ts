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
                textDtos.concat(dtoPair.textDtos)
            })
        }

        const setDto = {
            setId: set.id || uuid(),
            difficulty: set.difficulty,
            titleResourceName: titleTextDto.resourceName,
            descriptionResourceName: descriptionTextDto.resourceName,
            questions: questionDtos
        }

        const textResourceDtos: any[] = [titleTextDto, descriptionTextDto]
            .concat(textDtos)

        return new DtoBundle(setDto, textResourceDtos)
    }

    private mapToQuestionDto(question: Question): Pair {
        const questionTextResource = this.createTextResourceDto(question.text)
        const descriptionTextResource = this.createTextResourceDto(question.transcription)

        const answersDto: any[] = []
        const answerTextDtos: any[] = []
        if (question.answers && question.answers.length > 0) {
            question.answers.forEach((answer) => {
                const answerPair = this.mapToAnswerDto(answer)
                answersDto.push(answerPair.dto)
                answerTextDtos.concat(answerPair.textDtos)
            })
        }

        const correctAnswer = answersDto[question.correctAnswerIndex]
        const correctAnswerId = correctAnswer ? correctAnswer.answerId : undefined
        const dto = {
            questionId: question.id || uuid(),
            textResName: questionTextResource.resourceName,
            transcriptionResName: descriptionTextResource.resourceName,
            questionType: question.questionType,
            correctAnswerId: correctAnswerId,
            answers: answersDto
        }

        // collect text resource DTOs into one array
        const textDtos = [questionTextResource, descriptionTextResource]
            .concat(answerTextDtos)

        return new Pair(dto, textDtos)
    }

    private mapToAnswerDto(answer: Answer): Pair {
        const answerTextResourceDto = this.createTextResourceDto(answer.text)
        const textDtos = [answerTextResourceDto]
        const dto = {
            answerId: answer.id || uuid(),
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
