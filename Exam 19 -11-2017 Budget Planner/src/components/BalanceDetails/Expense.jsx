import React from 'react'
import {deleteExpense} from '../../api/remote'


export default ({name, category, cost, date, id}) => (
    <tr>
        <td>{name}</td>
        <td>{category}</td>
        <td>{cost}</td>
        <td>{date}</td>
        <td>
            <a  
            href="javascript:void(0)" 
            onClick={() => (deleteExpense(id))} 
            className="btn btn-secondary">Delete</a>
        </td>
    </tr>
)