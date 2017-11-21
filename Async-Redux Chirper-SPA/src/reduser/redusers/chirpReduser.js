import toastr from 'toastr';
import './../../../node_modules/toastr/build/toastr.min.css';


import {
    LOAD_CHIRPS,
    CREATE_CHIRPS
} from './../actions/actionTypes'

export default (store = [], action) => {
    switch (action.type) {
        case LOAD_CHIRPS:
            return action.payload
        case CREATE_CHIRPS:
            return [...store, action.payload]
        default:
            return store;
    }
}