import * as React from 'react'

interface Props {
    enabled: boolean,
    text: string
    onClick(): void
}

export class SubmitButton extends React.Component<Props, {}> {
    onClick() {
        this.props.onClick()
    }

    render() {
        return <button
            disabled={!this.props.enabled}
            type='button'
            value={this.props.text}
            onClick={ () => this.onClick() }>
                {this.props.text}
            </button>
    }
}