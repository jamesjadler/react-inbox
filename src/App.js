import React, {Component} from 'react';
import './App.css';
import MessageData from "./components/MessageData";
import Messages from "./components/Messages";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {messages: MessageData}
    }

    toggleStar(message) {
        console.log("StarredCallback hit");
        let messages = this.state.messages;
        console.log(message);
        let newMessage = {...message, starred: !message.starred};
        console.log(newMessage);
        let messageIndex = this.findIndexByMessage(message);
        console.log(messageIndex)
        //TODO update using .find and .indexof to find the element and then .slice to copy before, after and then set the state
        // this.setState({messages: [...messages[messageIndex],message]})
        console.log("=====")
        console.log(messages.slice(0, messageIndex))
        console.log(messages[messageIndex])
        console.log(messages.slice(messageIndex + 1))
        console.log(...messages.slice(0, messageIndex),
            newMessage,
            ...messages.slice(messageIndex + 1))
        this.setState({
            messages: [
                ...messages.slice(0, messageIndex),
                newMessage,
                ...messages.slice(messageIndex + 1)
            ]
        })
    };

    findIndexByMessage(message) {
        let messages = this.state.messages;
        return messages.indexOf(messages.find(m => m.id === message.id));
    }

    toggleCheck(message) {
        console.log("CheckCallback hit");
        message.selected = !message.selected;
    };

    render() {
        console.log(this.state.messages);
        return (
            <div className="App">
                <Messages checkCallback={this.toggleCheck.bind(this)} starredCallback={this.toggleStar.bind(this)}
                          messages={this.state.messages}></Messages>
            </div>
        );
    }
}

export default App;
