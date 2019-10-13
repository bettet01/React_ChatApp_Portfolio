import React from "react"


class SendMessageForm extends React.Component {

    constructor() {
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })

    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
        /** send message to chatkit */
    }
    
    render(e) {
        return(
            <div className='send-message-form'>
            <form onSubmit={this.handleSubmit}>
                <input
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message here and press Send"
                    type="text" />
            </form>
            </div>
        )
    }
}

export default SendMessageForm;