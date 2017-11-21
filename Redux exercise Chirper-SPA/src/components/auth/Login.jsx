import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Login extends Component {
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
        this.props.loginFunc(this.state)
    }


    render() {        
        return (
            <section id="viewLogin">
                <div className="content">
                    <form id="formLogin" className="form" onSubmit={this.onSubmit}>
                        <label>Username</label>
                        <input name="username" type="text" onChange={this.onChange} />
                        <label>Password</label>
                        <input name="password" type="password" onChange={this.onChange} />
                        <input id="btnLogin" defaultValue="Sign In" type="submit" />
                        <Link onClick={this.props.toggleFunc} to="/">Register</Link>                      
                    </form>
                </div>
            </section>

        )
    }

}