import React from 'react'
import Message from "./Message";

const Messages = ({checkCallback, readCallback, starredCallback, messages}) => {
    return (
        <div className="collection">
            {messages.map(message => <Message checkCallback={checkCallback} starredCallback={starredCallback}
                                              message={message}/>)}
        </div>
    )
};

export default Messages