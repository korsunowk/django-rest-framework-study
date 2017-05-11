/**
 * Created by base on 11.05.17.
 */
import React from 'react';

import Counter from './counter'
import TimeButton from './buttons/one-button'
import TimeDisplay from './display-time'

class CounterBlock extends React.Component {
    constructor (){
        super();
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milseconds: 0
        };
        this.AddMilisecond = this.AddMilisecond.bind(this);
        this.startTime = this.startTime.bind(this);
    }
    AddMilisecond(){
        let milisec = this.state.milseconds + 2;
        let seconds = this.state.seconds;
        let minutes = this.state.minutes;
        let hours = this.state.hours;

        if (milisec == 1000){
            milisec = 0;
            seconds = ++seconds
        }
        if (seconds  == 60){
            seconds = 0;
            minutes = ++minutes;
        }
        if (minutes == 60){
            minutes = 0;
            hours = ++hours;
        }
        this.setState({
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            milseconds: milisec
        })
    }
    startTime() {
        window.setInterval(
            this.AddMilisecond,
            1
        )
    }
    render () {
        let state = this.state;
        let timer = [state.hours, state.minutes, state.seconds, state.milseconds].join(':');
        return (
            <div className="block-counter">
                <Counter counter={this.props.counter}/>
                <TimeButton title="Time Button" className="time-button" onClick={this.startTime}/>
                <TimeDisplay title="Timer: " value={timer}/>
            </div>
        )
    }
}

export default CounterBlock;