import { LOGIN, LOGOUT, REGISTER, ADD_FOLLOWERS, SUCCESS_FOLLOWERS, SUCCESS_UNFOLLOWERS} from './actionTypes'
import action from './../actions/toastrActions'
import {  login, register, getFollowers} from './../../api/requests'


const appKey = 'kid_Hk4SphWPW'
const appId = '79d2e076e0f74ebbb708f37cda5868cc'


let authActions = {
    loginAction(payload) {
        return {
            type: LOGIN,
            payload
        }
    },
    addFollowers(payload){
        return {
            type: ADD_FOLLOWERS,
            payload
        }
    },
    successFollowers(payload){
        return {
            type: SUCCESS_FOLLOWERS,
            payload
        }
    },
    successUnFollowers(payload){
        return {
            type: SUCCESS_UNFOLLOWERS,
            payload
        }
    },
    logoutAction(){
        return{
            type: LOGOUT,
        }
    },
    loginFetch(input) {
        return function (dispatch) {
            dispatch(action.requestBegin('Loading...'))
            return login(input)
                .then(res => {
                    dispatch(action.requestEnd())
                    return res.json()
                })
                .then(json => {
                    if (json.error) {
                        return dispatch(action.requestError(json.description))
                    }
                    dispatch(authActions.loginAction(json))
                    getFollowers(json.username, json._kmd.authtoken).then(data => {
                        data.json().then(json => {
                            dispatch(authActions.addFollowers({followers: json.length}))
                        })
             
                    })
                })
        }
    },
    registerFetch(input) {
        return function (dispatch) {
            if (input.password !== input.repeatPass || !input.password) {
                 dispatch(action.requestError('Password must match config password'))
                 return
             }
            dispatch(action.requestBegin('Loading...'))
            return register(input)
                .then(res => {
                    dispatch(action.requestEnd())
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