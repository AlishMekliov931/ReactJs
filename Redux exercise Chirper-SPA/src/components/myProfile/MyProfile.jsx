import React from 'react'

import PostChirp from './../home/PostChirp'
import ListChirps from '../home/ListChirps'


export default (props) => (
    <section id="viewFeed">  
        <div className="content">
            <PostChirp />
            <ListChirps myChirps={true}/>
        </div>
    </section>
)