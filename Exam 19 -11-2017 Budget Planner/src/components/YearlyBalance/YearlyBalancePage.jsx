import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { yearBalance } from '../../api/remote'

import BalanceMonth from './BalanceMonth'

class YearBalance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: {},
            year: 0
        }

        this.getBalance = this.getBalance.bind(this);
    }



    componentWillMount() {
        if (localStorage.getItem('authToken') == null) {
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        this.getBalance()
    }

    async getBalance() {
        let year = this.props.match.params.year
        this.setState({year})
        if (!localStorage.getItem('authToken')) {
            return
        }
        let balance = await yearBalance(year)
        console.log(balance)
        this.setState({ balance })
    }
    render() {
        let currentYear = this.state.year
        const month = ["January", "February", "March", "April",
                       "May", "June", "July", "August",
                       "September", "October", "November", "December" ]
        return (
            <main>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Yearly Balance</h1>
                        </div>
                    </div>
                    <div className="row space-top col-md-12">
                    {month.map(m => { 
                        let index = month.indexOf(m)
                        let info = this.state.balance[index+1] || {}
                        return <BalanceMonth 
                        key={index}
                        year={currentYear}
                        monthName={m}
                        month={index+1}
                        info = {info}
                        />
                    })}          
                    </div>
                </div>
               </main>
        );
    }
}


export default withRouter(YearBalance);