import * as React from 'react'
import axios from 'axios'
import { Session } from '../../session/Session'
import { QuestionSet } from '../../models/QuestionSet'
import { v4 as uuid } from "uuid"

declare var API_HOST: string

interface Props {
    openSet(set: QuestionSet): void
}

interface State {
    sets: QuestionSet[]
}

class LearningSetDto {
    public sets: QuestionSet[]
}

export class QuestionSetList extends React.Component<Props, State> {
    state: Readonly<State> = {
        sets: []
    }

    private readonly session = new Session()

    private fetchSets() {
        const getSetsUrl = `${API_HOST}/api/v1/full`
        const config = {
            headers: { 'Authorization': this.session.getAuthHeader() }
        }
        axios.get(getSetsUrl, config)
            .then((response) => {
                const learningSet = response.data as LearningSetDto
                console.log(learningSet)
                this.setState((prevState) => {
                    return {
                        sets: learningSet.sets || prevState.sets
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

    openSet(set: QuestionSet) {
        this.props.openSet(set)
    }

    deleteSet(set: QuestionSet) {
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
        if (this.state.sets.length == 0) {
            return <div className="mx-auto">No question sets found</div>
        } else {
            return this.state.sets.map((set) => {
                return <div className="card mb-2 p-2" key={set.id}>
                    <h3>{set.title}</h3>
                    <p>{set.id}</p>
                    <p>
                        <a className="btn btn-secondary mr-1" onClick={ () => this.openSet(set) }>Edit</a>
                        <a className="btn btn-danger" onClick={ () => this.deleteSet(set) }>Delete</a>
                    </p>
                </div>
            })
        }
    }
}