import {MESSAGES_FETCHED, STAR_TOGGLED} from '../actions'


export default function messages(state = [], action) {
    switch (action.type) {

        case STAR_TOGGLED:
            console.log("In Reducer STAR_TOGGLED")
            return [
                ...state.messages,
                action.message
            ]

        case MESSAGES_FETCHED:
            console.log("In Reducer MESSAGES_FETCHED")
            console.log(action.messages)
            return action.messages

        default:
            return state
    }
}


