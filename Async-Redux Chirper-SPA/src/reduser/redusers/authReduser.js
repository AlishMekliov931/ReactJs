import toastr from 'toastr';
import './../../../node_modules/toastr/build/toastr.min.css';


import {
    LOGIN,
    LOGOUT,
    SUCCESS_FOLLOWERS,
    SUCCESS_UNFOLLOWERS,
    ADD_FOLLOWERS,
    REQUEST_BEGIN,
    REQUEST_END,
    ERROR
} from './../actions/actionTypes'

export default (store = {}, action) => {
    switch (action.type) {
        case LOGIN:
        toastr.success('Login success.')
            return Object.assign({}, action.payload)
        case ADD_FOLLOWERS:
        console.log(action.payload)
                return Object.assign({},store,  action.payload)
        case SUCCESS_FOLLOWERS:
           store['subscriptions'] = action.payload
                return Object.assign({},store )
        case SUCCESS_UNFOLLOWERS:
           store['subscriptions'] = action.payload
                   console.log( store)
              return Object.assign({}, store )
        case LOGOUT:
        toastr.success('Logout success.')
            return {}
        case REQUEST_BEGIN:
            toastr.info(action.text)
            return store
        case ERROR:
            toastr.error(action.text)
            return store
        case REQUEST_END:
            toastr.clear()
            return store
        default:
            return store;
    }
}