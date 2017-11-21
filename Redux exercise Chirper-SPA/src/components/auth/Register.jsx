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

    async onSubmit(e){
        e.preventDefault() 
        let res = await this.props.registerFunc(this.state)
        if (res) {
            this.props.loginFunc({               
                username: res.username,
                password: res.password
            })
        }
    }

    render() {
        return (
            <section id="viewRegister">
                <div className="content">
                    <form className="form" id="formRegister" onSubmit={this.onSubmit}>
                        <label>Username</label>
                        <input name="username" type="text" onChange={this.onChange} />
                        <label>Password</label>
                        <input name="password" type="password" onChange={this.onChange} />
                        <label>Repeat Password</label>
                        <input name="repeatPass" type="password" onChange={this.onChange} />
                        <input id="btnRegister" defaultValue="Register" type="submit" />
                        <Link onClick={this.props.toggleFunc} to="/">Log in</Link> 
                    </form>
                </div>
            </section>

        )
    }

}