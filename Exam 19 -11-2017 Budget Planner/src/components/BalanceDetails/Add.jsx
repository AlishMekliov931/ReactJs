import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { addExpense } from '../../api/remote'
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.min.css';

import Planer from './Planer'
import Expenses from './Expenses'

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name : '',
            cost  : '',
            paymentDate : '',
            category: 'Non-essential'
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.add = this.add.bind(this)

    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        console.log(this.state)
        this.add()

    }

    async add() {
        let year = +this.props.match.params.year
        let month = +this.props.match.params.month
        let body ={
            date: +this.state.paymentDate,
            name: this.state.name,
            category: this.state.category,
            amount: +this.state.cost
        }

        if (body.name == '') {
            toastr.error('Name cannot be empty.')
            return
        }
        if (isNaN(Number(body.amount)) || isNaN(Number(body.date)) || body.amount == '' || body.date == '') {
            toastr.error('Amount and Payment Date must be number')
            return
        }
        let res = await addExpense(year, month, body)
        this.props.history.push(`/details/${year}/${month}/${this.props.match.params.name}`);
        
    }


    render() {
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Add Expenses</h1>
                        <h3>{this.props.match.params.name} {this.props.match.params.year}</h3>
                    </div>
                </div>
                <div className="row space-top">
                    <div className="col-md-10">
                        <form onSubmit = {this.onSubmitHandler}>
                            <legend>Add a new expense</legend>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="name">Name:</label>
                                <input onChange = {this.onChangeHandler}  value={this.state.name} className="col-md-2" name="name" type="text" />
                            </div>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="category">Category:</label>
                                <select onChange = {this.onChangeHandler} className="col-md-2 pl-2" name="category">
                                    <option>Non-essential</option>
                                    <option>Fixed</option>
                                    <option>Variable</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="cost">Cost:</label>
                                <input onChange = {this.onChangeHandler} value={this.state.cost} className="col-md-2" name="cost" type="number" />
                            </div>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="paymentDate">Payment Date:</label>
                                <input onChange = {this.onChangeHandler} value={this.state.paymentDate} className="col-md-2" name="paymentDate" type="text" />
                            </div>
                            <input type="submit" className="btn btn-secondary" defaultValue="Add" />
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}


export default withRouter(Add);