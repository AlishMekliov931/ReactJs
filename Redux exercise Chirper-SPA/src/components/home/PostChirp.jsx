import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



import actions from './../../reduser/actions/chirpActions'


class PostChirp extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
        e.preventDefault()
        console.log(this.props)
        let body = {
            text: this.state.text,
            author: this.props.appState.authRedux.username
        }       
        let  token = this.props.appState.authRedux._kmd.authtoken
        this.props.actions.createChirps(body, token)
        .then(console.log)

        }

    render() {
       let {username, subscriptions, followers} = this.props.appState.authRedux
       let countChirps = this.props.appState.chirpReduser.filter(x => x.author === username).length
        return (
            <div className="chirper">
                <h2 className="titlebar">{username}</h2>
                <form onSubmit={this.onSubmit} id="formSubmitChirp" className="chirp-form">
                    <textarea onChange={this.onChange} name="text" className="chirp-input"></textarea>
                    <input className="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit" />
                </form>
                <div id="userStats" className="user-details">
                    <span>{countChirps} chirps</span> | <span>{subscriptions &&
                         subscriptions.length || 0} following</span> | <span>{followers} followers</span>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        appState: state
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostChirp);