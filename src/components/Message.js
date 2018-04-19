import React from 'react'


const Message = ({checkCallback, readCallback, starredCallback, message}) => {
    //Read should have "read" style
    //Unread should have "unread" style
    //Selected message should have "selected" style and checkbox checked
    //Labels should be displayed
    //Starred message should be marked

    const selectedStyle = () => {
        console.log(message.selected);
        var msg = "row message";
        msg = message.read === true ? msg + " read" : msg + " unread";
        msg = message.selected === true ? msg + " selected" : msg;
        return msg;
    };

    const starStyle = () => {
        return message.starred === true ? "star fa fa-star" : "star fa fa-star-o";
    };

    return (
        <div class={selectedStyle()}>
            <div class="col-xs-1">
                <div class="row">
                    <div class="col-xs-2">
                        <input type="checkbox" checked={message.selected === undefined ? false : message.selected}
                               onClick={() => checkCallback(message)}/>
                    </div>
                    <div class="col-xs-2">
                        <i class={starStyle()} onClick={() => starredCallback(message)}></i>
                    </div>
                </div>
            </div>
            <div class="col-xs-11">
                {message.labels !== undefined ? message.labels.map(label => <span
                    class="label label-warning">{label}</span>) : null}
                <a href="#">
                    {message.subject}
                </a>
            </div>
        </div>
    )
};

export default Message
