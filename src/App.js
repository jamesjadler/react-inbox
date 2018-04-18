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
        let newMessage = {...message, selected: message.selected = !message.selected};
        this.setMessageState(message, newMessage)
    };

    selectAllCallback() {
        let unchecked = this.state.messages.filter(message => message.selected === undefined ||
            message.selected === false);

        if (unchecked.length === 0) {
            //Deselect all and save
            this.state.messages.forEach((message) => this.toggleCheck(message))
        } else {
            //Select unchecked list and save
            unchecked.forEach((message) => {
                this.toggleCheck(message)
            })
        }
    }

    markReadCallback(read) {
        let checked = this.state.messages.filter(message => message.selected === true);

        checked.forEach((message) => {
            let newMessage = {...message, read: message.read = read};
            this.setMessageState(message, newMessage)

        })

    }

    // countUnreadCallback(){
    //     let unreadCount = this.state.messages.filter(message => message.read === false || message.read === undefined).length
    // }

    findIndexByMessage(message) {
        let messages = this.state.messages;
        return messages.indexOf(messages.find(m => m.id === message.id));
    }

    setMessageState(message, newMessage) {
        console.log("Replacing message: " + message + "\nWith Message: " + newMessage);
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
                <Toolbar markReadCallback={this.markReadCallback.bind(this)}
                         selectAllCallback={this.selectAllCallback.bind(this)}
                         messages={this.state.messages}></Toolbar>
                <Messages checkCallback={this.toggleCheck.bind(this)}
                          starredCallback={this.toggleStar.bind(this)}
                          messages={this.state.messages}></Messages>
            </div>
        );
    }
}

export default App;
