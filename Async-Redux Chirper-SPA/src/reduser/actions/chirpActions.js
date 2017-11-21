import toastr from 'toastr';

import action from './../actions/toastrActions'
import { LOAD_CHIRPS, CREATE_CHIRPS } from './actionTypes'
import {loadChirpsFatch, createChirpsFatch} from './../../api/requests'


let chirpActions = {
    loadChirpAction(payload){
        return{
            type: LOAD_CHIRPS,
            payload
        }
    },
    createChirpAction(payload){
        return{
            type: CREATE_CHIRPS,
            payload
        }
    },
    laodChirps(token) {
        return function (dispatch) {
            dispatch(action.requestBegin('Loading...'))
            
            return loadChirpsFatch(token)
                .then(res => {
                    dispatch(action.requestEnd())
                    return res.json()
                }).then(json => {
                    if (json.error) {
                        return dispatch(action.requestError(json.description))
                    }
                    return dispatch(chirpActions.loadChirpAction(json))
                })
        }
    },
    createChirps(body, token) {
        return function (dispatch) {
            dispatch(action.requestBegin('Loading...'))          
            return createChirpsFatch(body, token)
                .then(res => {
                    dispatch(action.requestEnd())
                    return res.json()
                }).then(json => {
                    if (json.error) {
                        return dispatch(action.requestError(json.description))
                    }
                    return dispatch(chirpActions.createChirpAction(json))
                })
        }
    }


}

export default chirpActions