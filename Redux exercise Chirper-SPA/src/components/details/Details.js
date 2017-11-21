import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import {getFollowers} from '../../api/requests'

import {getUser, followUserFatch, unfollowUserFatch} from './../../api/requests'
import Chirp from '../../components/home/Chirp'


import actions from './../../reduser/actions/authActions'


class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userDetails:{},
            followers: []
        }
        this.loadFollowers = this.loadFollowers.bind(this)
        this.followUser = this.followUser.bind(this)
        this.unfollowUser = this.unfollowUser.bind(this)
    }


    componentDidMount(){
        let id = this.props.match.params.id
        let token = this.props.token
        getUser(id, token).then(res => {
            res.json().then(json => {
                this.setState({userDetails: json})
                this.loadFollowers(json.username)
            })
        })
    }

    followUser(){
        this.props.currentUserSubs.push(this.state.userDetails.username)
        this.props.actions.successFollowers(this.props.currentUserSubs)
        followUserFatch(this.props.id, {subscriptions: this.props.currentUserSubs}, this.props.token)
        .then(res =>{
            res.json().then(json => {
                this.props.history.push('/')
            })
        })
    }
    unfollowUser(){
        let subs = this.props.currentUserSubs
        subs = subs.filter(u => u !== this.state.userDetails.username)
        this.props.actions.successUnFollowers( subs)
     
        unfollowUserFatch(this.props.id, {subscriptions: subs}, this.props.token)
        .then(res =>{
            res.json().then(json => {
                this.props.history.push('/')                
            })
        })        
    }

   
    async loadFollowers(username){
        let res = await getFollowers(username, this.props.token)
        let followersJson = await res.json()
        this.setState({followers: followersJson})
    }


    render() {
        let {username, subscriptions, _id} = this.state.userDetails;
        subscriptions = subscriptions || []
        let cirps =  this.props.chirpes.filter(c => c.author === username)
        let isFollowing = this.props.currentUserSubs.includes(this.state.userDetails.username)
        return (
            <section id="viewProfile">
            <div className="content">
                <div className="chirper">   
                    <h2 className="titlebar">{username}</h2>  
                    <a id="btnFollow" 
                    className="chirp-author" 
                    onClick={isFollowing ? ()=>( this.unfollowUser()) : () => (this.followUser())}
                    href="#">{isFollowing ? 'Unfollow' : "Follow"}</a>   
                    <div id="userProfileStats" className="user-details">
                        <span>{cirps.length} chirps</span> | <span>{subscriptions.length} following</span> | <span>{this.state.followers.length} followers</span>
                    </div>
                </div>
                <div id="profileChirps" className="chirps"><h2 className="titlebar">Chirps</h2>
                {cirps.length > 0 ? cirps.map(x => (
                    <Chirp
                        key={x._id}
                        author={x.author}
                        text={x.text}
                        date={x._kmd.lmt}
                        id={_id}
                    />
                )) : <p>No chitps in  database</p>}
                </div>
            </div>
        </section> 
        )
    }
}

function mapStateToProps(state) {
    return {
        chirpes: state.chirpReduser,
        token: state.authRedux._kmd.authtoken,
        currentUserName: state.authRedux.username,
        id: state.authRedux._id,
        currentUserSubs: state.authRedux.subscriptions || [],
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Details));