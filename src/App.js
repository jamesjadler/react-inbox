import React, {Component} from 'react';
import './App.css';
import MessageData from "./components/MessageData";
import Messages from "./components/Messages";
import Toolbar from "./components/Toolbar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {messages: MessageData}
    }

    toggleStar(message) {
        let newMessage = {...message, starred: !message.starred};
        this.setMessageState(message, newMessage)

    };

    toggleCheck(message) {
        let newMessage = {...message, selected: message.selected === undefined ? true : !message.selected};
        this.setMessageState(message, newMessage)
    };

    findIndexByMessage(message) {
        let messages = this.state.messages;
        return messages.indexOf(messages.find(m => m.id === message.id));
    }

    setMessageState(message, newMessage) {
        console.log("Replacing message: "+message + "\nWith Message: "+newMessage);
        let messageIndex = this.findIndexByMessage(message);

        this.setState({
            messages: [
                ...this.state.messages.slice(0, messageIndex),
                newMessage,
                ...this.state.messages.slice(messageIndex + 1)
            ]
        })
    }

    render() {
        console.log(this.state.messages);
        return (
            <div className="App">
                <Toolbar></Toolbar>
                <Messages checkCallback={this.toggleCheck.bind(this)} starredCallback={this.toggleStar.bind(this)}
                          messages={this.state.messages}></Messages>
            </div>
        );
    }
}

export default App;
