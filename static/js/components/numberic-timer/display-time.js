/**
 * Created by base on 11.05.17.
 */
import React from 'react';

class TimeDisplay extends React.Component {
    render () {
        return (
            <span className="time-display">{this.props.title} {this.props.value}</span>
        )
    }
}

export default TimeDisplay;