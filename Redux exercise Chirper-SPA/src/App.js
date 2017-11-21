import React, { Component } from 'react';
import './App.css';
import {  connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom'


import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Menu from './components/common/Menu'
import Preloader from './components/common/Preloader'

import Auth from './components/auth/Auth'
import Home from './components/home/Home'
import MyProfile from './components/myProfile/MyProfile'
import Discover from './components/discover/Discover'
import Details from './components/details/Details'

class App extends Component {

  constructor(props){  
    super(props)
  }

  render() {
    const {authState} = this.props
    return (
      <div className="App">
        <Header />
        <Preloader />
        <Menu userInfo={authState}/>

        <Switch>
        {!this.props.authState.username ?  
        <Route exact path="/" component={Auth} />  :
        <Route exact path="/" component={Home} />}
        {authState.username && <Route  path="/profile" component={MyProfile} /> }
        {authState.username && <Route  path="/discover" component={Discover} /> } 
        {authState.username && <Route  path="/details/:id" component={Details} /> }               
        <Route  component={() => ("Not Found")} />
        </Switch>

        <Footer />
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {
        authState: state.authRedux
    }
}



export default withRouter(connect(mapStateToProps)(App));


