import {
    CHECK_TOGGLED, DELETE, MARK_READ, MESSAGE_SENT, MESSAGES_FETCHED, SELECT_ALL, SET_LABELS,
    STAR_TOGGLED
} from '../actions'


export default function messages(state = [], action) {
    switch (action.type) {

        case STAR_TOGGLED:
            console.log("In Reducer STAR_TOGGLED");
            const messages = state;
            const messageIndex = messages.indexOf(messages.find(m => m.id === action.message.id));
            return [
                ...state.slice(0, messageIndex),
                action.message,
                ...state.slice(messageIndex + 1)
            ];


        case MESSAGES_FETCHED:
            console.log("In Reducer MESSAGES_FETCHED");
            console.log(action.messages);
            return action.messages;

        case MESSAGE_SENT:
            console.log("In Reducer MESSAGE_SENT");
            return [...state, action.newMessage];


        case CHECK_TOGGLED:
            console.log("In Reducer CHECK_TOGGLED");
            const checkMessages = state;
            const checkMessageIndex = checkMessages.indexOf(checkMessages.find(m => m.id === action.message.id));
            return [
                ...state.slice(0, checkMessageIndex),
                action.message,
                ...state.slice(checkMessageIndex + 1)
            ];


        case MARK_READ:
            console.log("In Reducer MARK_READ");
            console.log("Action.read:", action.read)
            return state.map(message => {

                    if (message.selected === true) {
                        return {...message, read: action.read}
                    }
                    return message;
                }
            );


        case SET_LABELS:
            console.log("In Reducer SET_LABELS");
            console.log("SET LABELS state:", state);

            return state.map(message => {
                if (message.selected === true) {
                    if (action.operation === "addLabel") {
                        if (message.labels.indexOf(action.label) < 0) {
                            message.labels.push(action.label);
                            let newLabels = message.labels;
                            console.log("newLabels", newLabels);
                            return {...message, labels: newLabels}
                        }

                    } else if (action.operation === "removeLabel") {
                        let labelIndex = message.labels.indexOf(action.label);
                        if (labelIndex >= 0) {
                            message.labels.splice(labelIndex, 1);
                            let newLabels = message.labels;
                            console.log("newLabels", newLabels);
                            return {...message, labels: newLabels}

                        }
                    }
                }
                return message
            });


        case SELECT_ALL:
            console.log("In Reducer SELECT_ALL");
            let newMessages = [];
            if (action.operation === "uncheckAll") {
                console.log("STATE:", state);
                newMessages = state.map(message => ({...message, selected: false}))
            } else if (action.operation === "checkAll") {
                console.log("STATE:", state);

                newMessages = state.map(message => ({...message, selected: true}))
            } else {
                console.log("FAILURE!!!:", newMessages, action)
            }
            return newMessages;


        case DELETE:
            console.log("In Reducer DELETE");
            return state.filter(message => message.selected !== true);


        default:
            return state
    }

}