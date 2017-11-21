import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import actions from './../../reduser/actions/chirpActions'
import Chirp from './Chirp'


class PostChirp extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.actions.laodChirps(this.props.authRedux._kmd.authtoken)
    }

    render() {
        const { myChirps, authRedux, chirpReduser } = this.props
        let chirpers = !myChirps ?
            chirpReduser :
            chirpReduser.filter(c => c['author'] === authRedux.username)
        if (!myChirps) {
            let subs = authRedux.subscriptions            
            chirpers = chirpers && chirpers.filter(x => subs && subs.includes(x.author))
        }

        return (
            <div id="chirps" className="chirps">
            <h2 className="titlebar">Chirps</h2>
                {chirpers.length > 0 ? chirpers.map(x => (
                    <Chirp
                        key={x._id}
                        author={x.author}
                        text={x.text}
                        date={x._kmd.lmt}
                        myChirps={myChirps}
                        id={x._acl.creator}
                        idChirp={x._id}
                        history={this.props.history}
                        token={authRedux._kmd.authtoken}
                    />
                )) : <p>No chitps in  database</p>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authRedux: state.authRedux,
        chirpReduser: state.chirpReduser
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostChirp));