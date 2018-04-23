import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {toggleStar} from "../actions";
import App from "../App";


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
    console.log("Message message:")
    console.log(message);
    return (
        <div class={selectedStyle()}>
            <div class="col-xs-1">
                <div class="row">
                    <div class="col-xs-2">
                        <input type="checkbox" checked={message.selected === undefined ? false : message.selected}
                               onClick={() => checkCallback(message)}/>
                    </div>
                    <div class="col-xs-2">
                        <i class={starStyle()} onClick={() => starredCallback(message)}/>
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

const mapDispatchToProps = dispatch => bindActionCreators({
    starredCallback: toggleStar,
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(Message)
