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
            hours: '00',
            minutes: '00',
            seconds: '00',
            milseconds: '000'
        };
        this.intervalObj = null;
        this.interval = false;

        this.AddMilisecond = this.AddMilisecond.bind(this);
        this.startTime = this.startTime.bind(this);
        this.stopTime = this.stopTime.bind(this);
        this.handleTimeButtonClick = this.handleTimeButtonClick.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
    }
    static formatWithThreeZeros(number) {
        if (number.toString().length == 1){
            number = '00' + number;
        }
        else if (number.toString().length == 2){
            number = '0' + number;
        }
        return number;
    }

    static formatWithTwoZeros(number) {
        if (number.toString().length == 1){
            number = '0' + number;
        }
        return number;
    }

    AddMilisecond(){
        let milisec = CounterBlock.formatWithThreeZeros(
            parseInt(this.state.milseconds) + 1
        );

        let seconds = this.state.seconds;
        let minutes = this.state.minutes;
        let hours = this.state.hours;

        if (milisec = 1000){
            milisec = '000';
            seconds = CounterBlock.formatWithTwoZeros(++seconds);
        }
        if (seconds  == 60){
            seconds = '00';
            minutes = CounterBlock.formatWithTwoZeros(++minutes);
        }
        if (minutes == 60){
            minutes = '00';
            hours = CounterBlock.formatWithTwoZeros(++hours);
        }

        this.setState({
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            milseconds: milisec
        })
    }

    handleTimeButtonClick() {
        if (this.interval)
            this.stopTime();
        else{
            this.clearTimer();
            this.startTime();
        }
    }
    clearTimer() {
        this.setState({
            hours: '00',
            minutes: '00',
            seconds: '00',
            milseconds: '000'
        })
    }
    startTime() {
        this.interval = true;
        this.intervalObj = window.setInterval(
            this.AddMilisecond,
            1
        )
    }
    stopTime() {
        this.interval = false;
        clearInterval(this.intervalObj);
    }

    render () {
        let state = this.state;
        let timer = [state.hours, state.minutes, state.seconds, state.milseconds].join(':');
        return (
            <div className="block-counter">
                <Counter counter={this.props.counter}/>
                <TimeButton title="Time Button" className="time-button" onClick={this.handleTimeButtonClick}/>
                <TimeDisplay title="Timer: " value={timer}/>
            </div>
        )
    }
}

export default CounterBlock;