/**
 * Created by base on 12.05.17.
 */

import React from 'react';
import Wheel from './wheel/wheel'
import WheelRange from './range-for-wheel/range-input-for-wheel'

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
                <Wheel speed={this.state.range} />
                <WheelRange onChange={this.handlerChangeRange} />
            </div>
        )
    }
}

export default WheelWithRange;