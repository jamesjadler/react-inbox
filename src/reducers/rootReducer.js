import {combineReducers} from 'redux'
import messages from './messagesReducer'
import compose from './composeReducer'

export default combineReducers({
    messages,
    compose
})