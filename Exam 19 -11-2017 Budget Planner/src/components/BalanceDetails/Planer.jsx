import React from 'react'

export default ({onSubmitHandler, onChangeHandler, income, budget}) => (
    <div className="col-md-3 space-top">
        <h4>Planner</h4>
        <form onSubmit ={onSubmitHandler}>
            <div className="form-group">
                <label className="form-control-label" htmlFor="income">Income:</label>
                <input
                    onChange={onChangeHandler}
                    value={income}
                    className="form-control"
                    name="income"
                    type="number" />
            </div>
            <div className="form-group">
                <label className="form-control-label" htmlFor="budget">Budget:</label>
                <input
                    onChange={onChangeHandler}
                    value={budget}
                    className="form-control"
                    name="budget"
                    type="number" />
            </div>
            <input type="submit" className="btn btn-secondary" defaultValue="Save" />
        </form>
    </div>
)