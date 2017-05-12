/**
 * Created by base on 12.05.17.
 */
import React from 'react';

export default class WheelRange extends React.Component {
    render () {
        return (
            <div className="wheel-range-block">
                <span>
                    Speed:
                </span>
                <input
                    onChange={this.props.onChange}
                    type="range"
                    min="1"
                    max="100"
                    className="wheel-range"
                />
            </div>
        )
    }
}