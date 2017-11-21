import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from './../../reduser/actions/authActions'
import Login from './Login'
import Register from './Register'

class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login: true
        }

        this.toggleAuth = this.toggleAuth.bind(this)
    }

    toggleAuth(){
        this.setState({login: !this.state.login})
    }

    render() {

        return (
            this.state.login ? 
            <Login 
             toggleFunc = {this.toggleAuth}
             loginFunc = {this.props.actions.loginFetch}/> : 
            <Register 
            toggleFunc = {this.toggleAuth} 
            loginFunc = {this.props.actions.loginFetch}
            registerFunc = {this.props.actions.registerFetch} />
        )
    }
}

function mapStateToProps(state) {
    return {
        appState: state.authRedux
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);