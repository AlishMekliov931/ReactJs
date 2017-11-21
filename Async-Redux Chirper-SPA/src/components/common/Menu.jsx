import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import store from './../../reduser/store'
import actions from './../../reduser/actions/authActions'

export default class Menu extends Component {
  constructor(props){
      super(props)
    }


  render() {
     const {username} = this.props.userInfo
    return (
      <div className="menu">
        <Link to="/">Home</Link>
        {username && <Link to="/discover">Discover</Link>}
        {username && <Link to="/profile">Me</Link>}
        {username && <Link onClick={() => store.dispatch(actions.logoutAction())} to="/">Logout</Link>}
      </div>
    )
  }
}