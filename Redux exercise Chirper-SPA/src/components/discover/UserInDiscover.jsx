import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'


import actions from './../../reduser/actions/usersActions'



class UserInDescover extends Component { 
    constructor(props) {
        super(props)

        this.state = {
            followers:""
        }
    }

    componentDidMount(){

        let token = this.props.user._kmd.authtoken
        let name = this.props.username
        this.props.actions.followersFetch(name, token).then(n => this.setState({followers: n.length}))
    }

    render(){
        return (
            <div className="userbox">
                <div><Link to={"/details/"+ this.props.id} className="chirp-author">{this.props.username}</Link></div>
                <div className="user-details">
                    <span>{this.state.followers} followers</span>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.authRedux,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserInDescover);