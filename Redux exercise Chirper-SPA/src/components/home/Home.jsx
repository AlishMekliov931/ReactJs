import React from 'react'

import PostChirp from './PostChirp'
import ListChirps from './ListChirps'

export default () => (
    <section id="viewFeed">
        <div className="content">
            <PostChirp />
            <ListChirps />
        </div>
    </section>
)