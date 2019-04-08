import { QuestionSet } from "./QuestionSet"
import { Question } from "./Question"
import { Answer } from "./Answer"
import { v4 as uuid } from "uuid"

class Pair {
    constructor(
        public dto: any, 
        public textDtos: any[]) {}
}

export class LearningSetDto {
    public sets: QuestionSetDto[]
}

export class QuestionDto {
    public id: string
    public correctAnswerId: string
    public text: string
    public transcription: string
    public type: string
    public answers: AnswerDto[]
}

export class QuestionSetDto {
    public difficulty: string
    public title: string
    public description: string
    public questions: QuestionDto[]
    public id: string
}

export class AnswerDto {
    public id: string
    public text: string
}

export class DtoBundle {
    constructor(
        public setDto: any,
        public textResources: any[]
    ) {}
}

export class DtoMapper {

    mapFromDtos(learningSet: LearningSetDto): QuestionSet[] {
        const questionSets: QuestionSet[] = []
        learningSet.sets.forEach((questionSetDto) => {
            const questionSet = QuestionSet.create(
                questionSetDto.difficulty,
                questionSetDto.title,
                questionSetDto.description,
                []
            )
            questionSet.id = questionSetDto.id
            questionSetDto.questions.forEach((questionDto) => {
                const question = Question.create(
                    questionDto.type,
                    questionDto.text,
                    questionDto.transcription,
                    []
                )
                question.id = questionDto.id

                questionDto.answers.forEach((answerDto) => {
                    const answer = Answer.create(answerDto.text)
                    answer.id = answerDto.id
                    question.answers.push(answer)
                })
                questionSet.questions.push(question)
            })
            questionSets.push(questionSet)
        })
        return questionSets
    }

    mapToDtoBundle(set: QuestionSet): DtoBundle {
        const descriptionTextDto = this.createTextResourceDto(set.description)
        const titleTextDto = this.createTextResourceDto(set.title)

        const questionDtos: any[] = []
        const textDtos: any[] = []
        if (set.questions && set.questions.length > 0) {
            set.questions.forEach((question) => {
                const dtoPair = this.mapToQuestionDto(question)
                questionDtos.push(dtoPair.dto)
                textDtos.push(...dtoPair.textDtos)
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
                answerTextDtos.push(...answerPair.textDtos)
            })
        }

        const dto = {
            questionId: question.id || uuid(),
            textResName: questionTextResource.resourceName,
            transcriptionResName: descriptionTextResource.resourceName,
            questionType: question.type,
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
