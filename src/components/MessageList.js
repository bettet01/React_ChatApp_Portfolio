import React from 'react';
import ReactDOM from 'react-dom'
import Message from './Message'

class MessageList extends React.Component {

UNSAFE_componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
}

componentDidUpdate() {
    if (this.shouldScrollToBottom) {
        const node = ReactDOM.findDOMNode(this)
        node.scrollTop = node.scrollHeight
    }
}

    render() {
        return(
            <div className='message-list'>
                {this.props.messages.map((message, index) =>{
                    return(

                        <div key={index}>
                            <Message username={message.senderId} text={message.parts[0].payload.content} />
                        </div>
                    )
                })}
            </div>
    
        )
    }
}

export default MessageList;