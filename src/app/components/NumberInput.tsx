import * as React from 'react'

interface Props {
    min: number,
    max: number,
    value: number,
    name: string,
    onChange(name: string, event: React.FormEvent<HTMLInputElement>): void
}

export class NumberInput extends React.Component<Props, {}> {

    render() {
        return <input
            type='number'
            min={this.props.min}
            max={this.props.max}
            name={this.props.name}
            onChange={(e) => this.props.onChange(this.props.name, e)}
        />
    }
}