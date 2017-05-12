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
        let start = this.props.start;

        return (
            <div className="watch">
                <WatchArrow delay={1000} type="seconds" start={start} />
                <WatchArrow delay={1000 * 60} type="minutes" start={start} />
                <WatchArrow delay={1000 * 60 * 60} type="hours" start={start} />
            </div>
        )
    }
}

export default Watch;