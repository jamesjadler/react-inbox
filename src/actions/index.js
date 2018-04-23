export const STAR_TOGGLED = 'STAR_TOGGLED'

export function toggleStar(message) {
    return async (dispatch) => {
        console.log("About to try to patch");
        console.log(message);
        const response = await fetch(`/api/messages`, {
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
        })

        const message = await response.json()
        dispatch({
            type: STAR_TOGGLED,
            message: message,
        })
    }
}


export const MESSAGES_FETCHED = 'MESSAGES_FETCHED'

export function fetchMessages() {
    return async (dispatch) => {
        console.log("Fetching Messages");

        const messageResponse = await fetch(`/api/messages`);
        const messages = await messageResponse.json();

        messages._embedded.messages.map(message => {
            message = messages._embedded.messages.find(item => message.id === item.id)
        });

        dispatch({
            type: MESSAGES_FETCHED,
            messages: messages._embedded.messages,
        })

        //
        // this.setState({
        //     messages: messages._embedded.messages
        // })
    }

}

