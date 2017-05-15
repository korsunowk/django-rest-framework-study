/**
 * Created by base on 11.05.17.
 */
import React from 'react';

class Counter extends React.Component {
    render () {
        return (
            <span className="counter">Counter: {this.props.counter}</span>
        )
    }
}

export default Counter;