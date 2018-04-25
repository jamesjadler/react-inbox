import {TOGGLE_COMPOSE} from "../actions";


export default function compose(state = false, action) {
    switch (action.type) {
        case TOGGLE_COMPOSE:
            console.log("TOGGLE COMPOSE HTI");
            return !state;

        default:
            return state
    }
}


