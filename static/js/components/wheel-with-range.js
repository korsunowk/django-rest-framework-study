/**
 * Created by base on 12.05.17.
 */

import React from 'react';
import SimpleWatch from './simple-watch'
import WheelRange from './range-input-for-wheel'

class WheelWithRange extends React.Component {
    constructor () {
        super();
        this.state = {
            range: 50
        };
        this.handlerChangeRange = this.handlerChangeRange.bind(this);
    }
    handlerChangeRange (e) {
        this.setState({
            range: e.target.value
        })
    }
    render () {
        return (
            <div className="wheel-with-range">
                <SimpleWatch speed={this.state.range} />
                <WheelRange onChange={this.handlerChangeRange} />
            </div>
        )
    }
}

export default WheelWithRange;