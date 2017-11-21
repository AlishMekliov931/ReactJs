import React, { Component } from 'react';
import Input from '../common/Input';
import { connect } from 'react-redux';
import { registerAction, redirect } from '../../actions/authActions';
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.min.css';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            repeat: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        let name = this.state.username
        let email = this.state.email
        let password = this.state.password
        let repeat = this.state.repeat
        if (name === '' || email === '') {
            toastr.error(`The name and e-mail fields must not be empty`)
            return
        }
        if (password.length < 4 ) {
            toastr.error(`Password must be at least 4 characters long`)
            return
        }
        if (password !== repeat) {
            toastr.error(`Password don't match`)
            return
        }
        this.props.register(name, email, password);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.registerSuccess) {
            this.props.redirect();
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <main>
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeHandler}
                        label="Username"
                    />
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
                    <Input
                        name="repeat"
                        type="password"
                        value={this.state.repeat}
                        onChange={this.onChangeHandler}
                        label="Repeat password"
                    />
                    <input type="submit" value="Register" />
                </form>
            </div>
            </main>
        );
    }
}

function mapState(state) {
    return {
        registerSuccess: state.register.success
    };
}

function mapDispatch(dispatch) {
    return {
        register: (name, email, password) => dispatch(registerAction(name, email, password)),
        redirect: () => dispatch(redirect())
    };
}

export default connect(mapState, mapDispatch)(RegisterPage);