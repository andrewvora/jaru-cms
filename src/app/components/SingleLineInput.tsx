import * as React from 'react'

interface Props {
    value: string,
    hint: string,
    name: string,
    type: string,
    onChange(name: string, event: React.FormEvent<HTMLInputElement>): void
}

export class SingleLineInput extends React.Component<Props, {}> {
    render() {
        return <input 
            type={this.props.type} 
            name={this.props.name} 
            value={this.props.value}
            placeholder={this.props.hint}
            onChange={ (e) => this.props.onChange(this.props.name, e) }/>
    }
}