import * as React from 'react'

interface Props {
    selected: string
    options: string[]
    onOptionSelected(value: string): void
}

interface State {
    selectedOption: string
}

export class RadioGroup extends React.Component<Props, State> {

    state: Readonly<State> = {
        selectedOption: this.props.selected
    }

    optionSelected(event: React.FormEvent<HTMLInputElement>) {
        const selectedOption = event.currentTarget.value
        this.setState(() => {
            return {
                selectedOption: selectedOption
            }
        })
        this.props.onOptionSelected(selectedOption)
    }

    render() {
        return <div>
            { this.props.options.map((option) => {
                return <div
                        key={option+"container"} 
                        className="form-check form-check-inline">
                        <input 
                                type="radio"
                                key={option} 
                                value={option}
                                checked={this.state.selectedOption === option}
                                onChange={this.optionSelected.bind(this)}
                                className="form-check-input"/>
                        <label 
                            key={option + "label"}
                            className="form-check-label">
                            {option}
                        </label>  
                    </div>
            }) }
        </div>
    }
}