import toastr from 'toastr';


import {
    REQUEST_BEGIN,
    REQUEST_END,
    ERROR
} from './actionTypes'



export default {
    
    requestBegin: (text) => ({
        type: REQUEST_BEGIN,
        text}
    ),
    requestError: (text) => ({
        type: ERROR,
        text}
    ),
    requestEnd: () => ({
        type: REQUEST_END
        }
    ),

}