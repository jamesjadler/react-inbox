import React, {Component} from 'react'
import Message from "./Message";
import {connect} from "react-redux";

class Messages extends Component {
    render() {
        return (
            <div className="collection">
                {this.props.messages.map(message => <Message key={message.id} message={message}/>)}
            </div>
        )
    };
}

const mapStateToProps = state => ({...state})

const mapDispatchToProps = () => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages)

