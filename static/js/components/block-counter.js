/**
 * Created by base on 11.05.17.
 */
import React from 'react';
import Counter from './counter'
import TimeButton from './buttons/one-button'


class CounterBlock extends React.Component {
    render () {
        return (
            <div className="block-counter">
                <Counter counter={this.props.counter}/>
                <TimeButton title="Time Button" className="time-button"/>
            </div>
        )
    }
}

export default CounterBlock;