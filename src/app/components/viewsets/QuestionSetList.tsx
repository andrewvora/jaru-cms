import * as React from 'react'
import { QuestionSet } from '../../models/QuestionSet'
import axios from 'axios'
import { Session } from '../../session/Session'

declare var API_HOST: string

interface Props {}

interface State {
    sets: QuestionSetDto[]
}

class AllSetsDto {
    public questionSets: QuestionSetDto[]
}

class QuestionSetDto {
    public id: string
    public title: string
}

export class QuestionSetList extends React.Component<Props, State> {
    state: Readonly<State> = {
        sets: []
    }

    private readonly session = new Session()

    private fetchSets() {
        const getSetsUrl = `${API_HOST}/api/v1/sets/all`
        const config = {
            headers: { 'Authorization': this.session.getAuthHeader() }
        }
        axios.get(getSetsUrl, config)
            .then((response) => {
                const sets = response.data as AllSetsDto
                this.setState((prevState) => {
                    return {
                        sets: sets.questionSets || prevState.sets
                    }
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.fetchSets()
    }

    deleteSet(set: QuestionSetDto) {
        const config = {
            headers: { 'Authorization': this.session.getAuthHeader() }
        }
        const deleteSetUrl  = `${API_HOST}/content/v1/set/${set.id}`
        console.log(deleteSetUrl)
        axios.delete(deleteSetUrl, config)
            .then(() => {
                this.fetchSets()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return <div>
            {
                this.state.sets.map((set) => {
                    return <div>
                        <p>{set.id}</p>
                        <p>
                            <a onClick={ () => this.deleteSet(set) }>Delete</a>
                        </p>
                    </div>
                })
            }
        </div>
    }
}