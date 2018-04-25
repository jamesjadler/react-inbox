import React, {Component} from 'react';
import './App.css';
import Messages from "./components/Messages";
import Toolbar from "./components/Toolbar";
import Compose from "./components/Compose";
import {connect} from "react-redux";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Toolbar messages={this.props.messages}/>
                {this.props.compose === true ? <Compose/> : ""}
                <Messages/>
            </div>
        );
    }
}

const mapStateToProps = state => ({...state});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

