import React from 'react'
import { Link } from 'react-router-dom';

import Expense from './Expense'

export default ({expenses, year, month, name}) => (
    <div className="col-md-8 space-top">
        <div className="row">
            <h4 className="col-md-9">Expenses</h4>
            <Link 
            
            to={`/add/${year}/${month}/${name}`} 
            className="btn btn-secondary ml-2 mb-2">Add expenses</Link>
        </div>
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Cost</th>
                    <th>Payment Date</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {expenses.map(e => {
                    let date = `${e.date}-${e.month}-${e.year}`
                    return <Expense 
                    key= {e.id}
                    name = {e.name}
                    category = {e.category}
                    cost                 ={e.amount}
                    date = {date}
                    id={e.id}
                    />
                })}
 
            </tbody>
        </table>
    </div>
)