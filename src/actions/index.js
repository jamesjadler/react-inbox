export const STAR_TOGGLED = 'STAR_TOGGLED';

export function starredCallback(message) {
    return async (dispatch) => {
        console.log("About to try to patch", message);
        let newMessage = {...message, starred: !message.starred};
        await fetch(`/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: [newMessage.id],
                command: "star",
                star: newMessage.starred
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        dispatch({
            type: STAR_TOGGLED,
            message: newMessage,
        })
    }
}

export const MESSAGES_FETCHED = 'MESSAGES_FETCHED';

export function fetchMessages() {
    return async (dispatch) => {
        console.log("Fetching Messages");
        const messageResponse = await fetch(`/api/messages`);
        const messages = await messageResponse.json();

        dispatch({
            type: MESSAGES_FETCHED,
            messages: messages._embedded.messages,
        })

    }

}

export const CHECK_TOGGLED = 'CHECK_TOGGLED';

export function checkCallback(message) {
    return async (dispatch) => {
        let newMessage = {...message, selected: message.selected = !message.selected};

        dispatch({
            type: CHECK_TOGGLED,
            message: newMessage
        })
    }
};

export const MARK_READ = 'MARK_READ';

export function markReadCallback(messages, read) {
    return async (dispatch) => {
        let checked = messages.filter(message => message.selected === true);
        let msgIds = checked.map(message => message.id);
        console.log("About to try to patch messages", msgIds);
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

        dispatch({
            type: MARK_READ,
            read: read
        })
    }
}

export const SET_LABELS = 'SET_LABELS';

export function labelSelectedCallback(messages, label, operation) {
    return async (dispatch) => {
        let checked = messages.filter(message => message.selected === true);
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

        dispatch({
            type: SET_LABELS,
            operation: operation,
            label: label,
            // msgIds:msgIds
        })
    }
}

export const TOGGLE_COMPOSE = 'TOGGLE_COMPOSE';

export function toggleCompose() {
    return async (dispatch) => {

        dispatch({
            type: TOGGLE_COMPOSE,
        })
    }
}

export const SELECT_ALL = 'SELECT_ALL';

export function selectAllCallback(messages) {
    return async (dispatch) => {
        let unchecked = messages.filter(message => message.selected === undefined ||
            message.selected === false);

        if (unchecked.length === 0) {
            //Deselect all and save
            // messages.forEach((message) => this.checkCallback(message))
            dispatch({
                type: SELECT_ALL,
                operation: "uncheckAll"
            })
        } else {
            //Select unchecked list and save
            //  unchecked.forEach((message) => {this.checkCallback(message)})
            dispatch({
                type: SELECT_ALL,
                operation: "checkAll",
            })
        }

    }

}


export const DELETE = 'DELETE';

export function deleteSelectedCallback(messages) {
    console.log("DELETE METHOD HIT");
    return async (dispatch) => {
        let checked = messages.filter(message => message.selected === true);
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

        dispatch({
            type: DELETE,
            msgIds: msgIds
        })
    }

}

export const MESSAGE_SENT = 'MESSAGE_SENT';
export function sendMessage(subject, body){
    return async (dispatch)=>{

           let response = await fetch(`/api/messages`, {
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
           let newMessage = await response.json();
        dispatch({
            type:MESSAGE_SENT,
            newMessage: newMessage

        })
    }
}
