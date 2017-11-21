import React, { Component } from 'react';
import Input from '../common/Input';
import { connect } from 'react-redux';
import { loginAction, redirect } from '../../actions/authActions';
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.min.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        if (this.state.email === '') {
            toastr.error(`E-mail field must not be empty`)
            return
        }
        if (this.state.password.length < 4 ) {
            toastr.error(`Password must be at least 4 characters long`)
            return
        }

        this.props.login(this.state.email, this.state.password);
    }

    componentWillReceiveProps(newProps) {
        
        if (newProps.loginSuccess) {
        let currentYear = new Date().getFullYear()
        
            this.props.redirect();
            this.props.history.push('/yearly/' + currentYear);
        }
    }

    render() {
        return (
            <main>
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        label="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        label="Password"
                    />
                    <input type="submit" value="Login" />
                </form>
            </div>
            </main>
        );
    }
}

function mapState(state) {
    return {
        loginSuccess: state.login.success
    };
}

function mapDispatch(dispatch) {
    return {
        login: (email, password) => dispatch(loginAction(email, password)),
        redirect: () => dispatch(redirect())
    };
}

export default connect(mapState, mapDispatch)(LoginPage);