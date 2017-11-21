import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        let year = new Date()
        year = year.getFullYear()
        let month = new Date().getMonth() 
        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      let monthName = monthNames[month]
        return (
            
            <header>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {loggedIn && <NavLink className="nav-link" activeClassName="active"  to={`/details/${year}/${month+1}/${monthName}`}>Monthly Balance</NavLink>}
                                {loggedIn && <NavLink className="nav-link" activeClassName="active" to={"/yearly/" + year}>Yearly Balance</NavLink>}
                                {loggedIn && <a className="nav-link" href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                                {!loggedIn &&<NavLink className="nav-link" activeClassName="active" exact to="/">Login</NavLink>}
                                {!loggedIn&& <NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink>}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}