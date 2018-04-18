import React, {Component} from 'react';
import './App.css';
import MessageData from "./components/MessageData";
import Messages from "./components/Messages";

class App extends Component {
    state = {
        messages: MessageData
    };

    toggleStar(message) {
        console.log("StarredCallback hit")
        //TODO update using .find and .indexof to find the element and then .slice to copy before, after and then set the state
        // this.setState({messages: [...this.state.messages[message],message]})
    };

    toggleCheck(message) {
        console.log("CheckCallback hit");
        message.selected = !message.selected;
    };

    render() {
        console.log(this.state.messages);
        return (
            <div className="App">
                <Messages checkCallback={this.toggleCheck} starredCallback={this.toggleStar}
                          messages={MessageData}></Messages>
            </div>
        );
    }
}

export default App;
