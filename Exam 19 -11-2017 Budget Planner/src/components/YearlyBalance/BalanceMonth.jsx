import React from 'react'
import { NavLink } from 'react-router-dom';


export default ({monthName, year, month, info}) => (
    <div className="col-md-3">
        <div className="card text-white bg-secondary">
            <div className="card-body">
                <blockquote className="card-blockquote">
                    <h2>{monthName}</h2>
                    <h4>Year {year}</h4>
                    <label htmlFor="budget">Budget:</label>
                    <input className="col-md-9" name="budget" value={info.budget || 0} disabled />
                    <label htmlFor="balance">Balance:</label>
                    <input className="col-md-9" name="balance" value={info.balance || 0}  disabled />
                    <div className="space-top">
                        <NavLink to={`/details/${year}/${month}/${monthName}`} >Details</NavLink>
                    </div>
                </blockquote>
            </div>
        </div>
    </div>
)