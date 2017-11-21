import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import actions from './../../reduser/actions/usersActions'
import UserInDiscover from './UserInDiscover'


class Discover extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.actions.usersFetch(this.props.user._kmd.authtoken).then(data => {
            this.props.actions.loadUsersAction(data)
        })
    }

    render() {
        const {users} = this.props  
        return (
            <section id="viewDiscover">
            <div className="content">
              <div className="chirps">
                <h2 className="titlebar">Discover</h2>
                <div id="userlist">
                 {users.map(u => {
                     return <UserInDiscover
                      key ={u._id} 
                      id ={u._id} 
                      username={u.username}/>
                 })}
                </div>
              </div>
            </div>
          </section>          
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.authRedux,
        users: state.usersReduser,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Discover);