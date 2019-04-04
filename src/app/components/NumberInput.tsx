import * as React from 'react'

interface Props {
    min: number,
    max: number,
    value: number,
    name: string,
    label: string,
    disabled: boolean,
    onChange(name: string, event: React.FormEvent<HTMLInputElement>): void
}

export class NumberInput extends React.Component<Props, {}> {

    render() {
        return <div className="form-group">
            <label
                className="col-form-label">
                {this.props.label}
            </label>
            <input
                type='number'
                min={this.props.min}
                max={this.props.max}
                name={this.props.name}
                disabled={this.props.disabled}
                value={this.props.value}
                onChange={(e) => this.props.onChange(this.props.name, e)}
                className="form-control"
            />
        </div>
    }
}