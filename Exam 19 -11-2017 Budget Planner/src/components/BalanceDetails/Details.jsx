import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { monthBalance, updateMonth } from '../../api/remote'
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.min.css';


import Planer from './Planer'
import Expenses from './Expenses'

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            income: 0,
            budget: 0,
            expenses: [],
        }

        this.getDetails = this.getDetails.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.update = this.update.bind(this);
        
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        console.log(this.state)
        this.update()
        // this.props.login(this.state.email, this.state.password);
    }

    componentWillMount() {
        if (localStorage.getItem('authToken') == null) {
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        this.getDetails()
    }

    async update() {
        let year = +this.props.match.params.year
        let month = +this.props.match.params.month
        if (isNaN(Number(this.state.income)) || isNaN(Number(this.state.budget)) || 
        this.state.budget == '' || this.state.income == '' ) {
            toastr.error('Income and Budget Date must be number')
            return
        }
        let body ={
            income: +this.state.income,
            budget: +this.state.budget
        }
        let res = await updateMonth(year, month, body)
        console.log(res)
    }

    async getDetails() {
        let year = +this.props.match.params.year
        let month = +this.props.match.params.month
        let { budget, income, expenses } = await monthBalance(year, month)
        this.setState({ budget, income, expenses })
    }
    render() {
        let year = this.props.match.params.year
        let month = this.props.match.params.month
        let name = this.props.match.params.name
        return (
            <main>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Welcome to Budget Planner</h1>
                        </div>
                    </div>
                    <div className="row space-top ">
                        <div className="col-md-12 ">
                            <div className="card bg-secondary">
                                <div className="card-body">
                                    <blockquote className="card-blockquote">
                                        <h2 id="month">{this.props.match.params.name} {this.props.match.params.year}</h2>
                                        <div className="row">
                                            <Planer
                                                onSubmitHandler = {this.onSubmitHandler}
                                                onChangeHandler={this.onChangeHandler}
                                                income={this.state.income}
                                                budget={this.state.budget}
                                            />
                                            <Expenses
                                                name = {name}
                                                month={month}
                                                year={year}
                                                expenses={this.state.expenses}
                                            />
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </main>
        );
    }
}


export default withRouter(Details);