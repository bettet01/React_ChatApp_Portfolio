import React from 'react';

function MessageList(props) {
    return(
        <div className='message'>
            <div className='message-username'>{props.username}</div>
            <div className='message-text'>{props.text}</div>
        </div>
    )
}

export default MessageList;