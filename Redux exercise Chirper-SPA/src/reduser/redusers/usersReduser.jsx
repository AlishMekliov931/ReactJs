
import {USERS_SUCCESS} from './../actions/actionTypes'

export default (store = [], action) => {
    switch (action.type) {
        case USERS_SUCCESS:
            return action.payload
        default:
            return store;
    }
}