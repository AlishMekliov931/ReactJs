import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction } from './actions/authActions';


import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import YearlyBalance from './components/YearlyBalance/YearlyBalancePage';
import Details from './components/BalanceDetails/Details';
import Add from './components/BalanceDetails/Add';

import Preloader from './components/common/Preloader'

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logout();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="App">
               <Preloader />
            
                <Header loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
              
                    <Route exact path="/" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route  path="/yearly/:year" component={YearlyBalance} />                    
                    <Route  path="/details/:year/:month/:name" component={Details} />                    
                    <Route  path="/add/:year/:month/:name" component={Add} />                    
                </Switch>
            <Footer />
            
            </div>
        );
    }
}

function mapState(state) {
    return {};
}

function mapDispatch(dispatch) {
    return {
        logout: () => dispatch(logoutAction())
    };
}


export default withRouter(connect(mapState, mapDispatch)(App));