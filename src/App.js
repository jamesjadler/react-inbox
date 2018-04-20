import React, {Component} from 'react';
import './App.css';
import Messages from "./components/Messages";
import Toolbar from "./components/Toolbar";
import Compose from "./components/Compose";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {messages: [], compose: false}
    }

    async toggleStar(message) {
        console.log("About to try to patch");
        await fetch(`/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: [message.id],
                command: "star",
                star: !message.starred
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        //Reload messages after update
        this.reloadMessages();

    };

    toggleCheck(message) {
        let newMessage = {...message, selected: message.selected = !message.selected};
        this.setMessageState(message, newMessage)
    };

    toggleCompose() {
        this.setState((prevState) => {
            return ({...prevState, compose: !prevState.compose})
        });
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

    async markReadCallback(read) {
        let checked = this.state.messages.filter(message => message.selected === true);
        let msgIds = checked.map(message => message.id);
        console.log("About to try to patch");
        await fetch(`/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: msgIds,
                command: "read",
                read: read
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        //Reload messages after update
        this.reloadMessages();


        checked.forEach((message) => {
            let newMessage = {...message, read: message.read = read};
            this.setMessageState(message, newMessage)
        })
    }

    findIndexByMessage(message) {
        let messages = this.state.messages;
        return messages.indexOf(messages.find(m => m.id === message.id));
    }

    setMessageState(message, newMessage) {
        console.log("Replacing message: " + message + "\nWith Message: " + newMessage);
        console.log(message)
        console.log(newMessage)
        let messageIndex = this.findIndexByMessage(message);

        this.setState((prevState) => {
            return {
                messages: [
                    ...prevState.messages.slice(0, messageIndex),
                    newMessage,
                    ...prevState.messages.slice(messageIndex + 1)
                ]
            }
        })
    }

    async deleteSelectedCallback() {
        console.log("Delete btn pressed:")
        let checked = this.state.messages.filter(message => message.selected === true);
        let msgIds = checked.map(message => message.id);

        await fetch(`/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: msgIds,
                command: "delete"
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        //Reload messages after update
        this.reloadMessages();
    }

    async labelSelectedCallback(label, operation) {
        let checked = this.state.messages.filter(message => message.selected === true);
        let msgIds = checked.map(message => message.id);
        console.log("label update:" + msgIds + "label:" + label);
        await fetch(`/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: msgIds,
                command: operation,
                label: label
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        //Reload messages after update
        this.reloadMessages();
    }

    async sendMessage(subject, body) {

        await fetch(`/api/messages`, {
            method: 'POST',
            body: JSON.stringify({
                subject: subject,
                command: body
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        //Reload messages after update
        this.reloadMessages();
    }

    async componentDidMount() {
        const messageResponse = await fetch(`/api/messages`);
        const messages = await messageResponse.json();

        messages._embedded.messages.map(message => {
            message = messages._embedded.messages.find(item => message.id === item.id)
        });
        console.log(messages._embedded.messages);
        this.setState({
            messages: messages._embedded.messages
        })
    }

    async reloadMessages() {
        const messageResponse = await fetch(`/api/messages`);
        const messages = await messageResponse.json();

        this.setState((prevState) => {
            return ({
                    messages: messages._embedded.messages.map((message) => {
                            let prevMsg = prevState.messages.find(item => message.id === item.id);
                            let selected = prevMsg === undefined ? false : prevMsg.selected;
                            return (
                                {
                                    ...message, selected: selected
                                }

                            );
                        }
                    )
                }
            )
        })
    }

    render() {
        console.log(this.state.messages);
        return (
            <div className="App">
                <Toolbar markReadCallback={this.markReadCallback.bind(this)}
                         selectAllCallback={this.selectAllCallback.bind(this)}
                         deleteSelectedCallback={this.deleteSelectedCallback.bind(this)}
                         labelSelectedCallback={this.labelSelectedCallback.bind(this)}
                         toggleCompose={this.toggleCompose.bind(this)}
                         messages={this.state.messages}/>
                {this.state.compose === true ? <Compose sendMessage={this.sendMessage.bind(this)}/> : ""}
                <Messages checkCallback={this.toggleCheck.bind(this)}
                          starredCallback={this.toggleStar.bind(this)}
                          messages={this.state.messages}/>
            </div>
        );
    }
}

export default App;
