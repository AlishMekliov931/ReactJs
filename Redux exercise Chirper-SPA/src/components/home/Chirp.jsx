import React from 'react'
import calcTime from './../../utils/calcTime'
import { Link } from 'react-router-dom'
import {deleteChirp} from '../../api/requests'

function removeChirp(id, token, history) {
    deleteChirp(id, token).then(res =>{
        history.push('/')
    })
}

export default (props) => {
     let {author, text, date, myChirps, id, token, history, idChirp} = props

    return(
        <article className="chirp">
            <div className="titlebar">
                <Link to={`/details/${id}`} className="chirp-author">{author}</Link>
                <span className="chirp-time">
                {myChirps && 
                    <a
                    onClick={() => (removeChirp(idChirp, token, history))}
                     href="#">Delete </a>}                 
                { calcTime(date)} day</span>
            </div>
            <p>{text}</p>
        </article>
    )
}