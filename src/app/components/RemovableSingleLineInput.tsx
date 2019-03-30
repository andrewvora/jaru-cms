import * as React from 'react'

interface Props {
    value: string,
    hint: string,
    name: string,
    type: string,
    onChange(name: string, event: React.FormEvent<HTMLInputElement>): void
    onRemove(name: string, event: React.MouseEvent): void
}

export class RemovableSingleLineInput extends React.Component<Props, {}> {
    render() {
        return <div className="input-group mb-3">
                <input 
                    type={this.props.type} 
                    name={this.props.name} 
                    value={this.props.value}
                    placeholder={this.props.hint}
                    onChange={ (e) => this.props.onChange(this.props.name, e) }
                    className="form-control"/>

                <div className="input-group-append">
                        <button type="button"
                            className="btn btn-outline-danger"
                            onClick={ (e) => this.props.onRemove(this.props.name, e)}>
                            X
                        </button>
                    </div>
            </div>
    }
}