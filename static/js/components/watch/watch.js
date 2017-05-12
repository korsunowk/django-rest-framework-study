/**
 * Created by base on 12.05.17.
 */
import React from 'react';
import WatchArrow from './watch-arrow'

class Watch extends React.Component {
    constructor () {
        super();
    }

    render() {
        return (
            <div className="watch">
                <WatchArrow delay={1000} type="seconds" />
                <WatchArrow delay={1000 * 60} type="minutes" />
                <WatchArrow delay={1000 * 60 * 60} type="hours" />
            </div>
        )
    }
}

export default Watch;