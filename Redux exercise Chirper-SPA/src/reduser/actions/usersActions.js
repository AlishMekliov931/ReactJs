import { USERS_SUCCESS} from './actionTypes'
import {getAllUsers, getFollowers } from './../../api/requests'

import action from './../actions/toastrActions'


let authActions = {
    loadUsersAction(payload) {
        return {
            type: USERS_SUCCESS,
            payload
        }
    },

    usersFetch(token) {
        return function (dispatch) {
            dispatch(action.requestBegin('Loading...'))
            return getAllUsers(token)
                .then(res => {
                    dispatch(action.requestEnd())
                    return res.json()
                })
                .then(json => {
                    if (json.error) {
                        return dispatch(action.requestError(json.description))
                    }
                    return json
                })
        }
    },
    followersFetch(username, token) {
        return function (dispatch) {
            return getFollowers(username, token)
                .then(res => {
                    return res.json()
                }).then(json => {
                    if (json.error) {
                        return dispatch(action.requestError(json.description))
                    }
                    return json
                })
        }
    },
}

export default authActions