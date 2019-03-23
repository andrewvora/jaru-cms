import * as React from 'react'

const ROWS = 4

interface Props {
    field: string,
    hint: string,
    name: string,
    type: string,
    onChange(name: string, event: React.FormEvent<HTMLTextAreaElement>): void
}

export class MultiLineInput extends React.Component<Props, {}> {
    render() {
        return <div className="input-group">
                <textarea
                    name={this.props.name}
                    rows={ROWS}
                    value={this.props.field}
                    placeholder={this.props.hint}
                    onChange={ (e) => this.props.onChange(this.props.name, e) }
                    className="form-control"/>
            </div> 
    }
}