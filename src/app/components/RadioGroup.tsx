import * as React from 'react'

interface Props {
    options: string[]
    onOptionSelected(value: string): void
}

interface State {
    selectedOption: string
}

export class RadioGroup extends React.Component<Props, State> {

    state: Readonly<State> = {
        selectedOption: ''
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
                return <label>
                    <input 
                        type='radio'
                        key={option} 
                        value={option}
                        checked={this.state.selectedOption === option}
                        onChange={this.optionSelected.bind(this)}/>
                        {option}
                </label>  
            }) }
        </div>
    }
}