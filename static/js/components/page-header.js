/**
 * Created by base on 10.05.17.
 */
import React from 'react';
import TimeDisplay from './display-time';

function normalizeTime(time) {
    return time.toString().length == 2 ? time : '0' + time
}


class PageHeader extends React.Component {
    constructor (){
        super();
        this.getTime = this.getTime.bind(this);

        this.state = this.getTime();

        this.setNewTime = this.setNewTime.bind(this);
    }

    getTime() {
        let date = new Date();
        return {
            hours : date.getHours(),
            minutes : date.getMinutes(),
            seconds : date.getSeconds(),
            milisec : date.getMilliseconds().toString().substr(1, 3)
        }
    }
    setNewTime(){
        let date = new Date();

        this.setState(
            this.getTime()
        )
    }

    render() {
        let state = this.state;
        let date = [
            normalizeTime(state.hours),
            normalizeTime(state.minutes) ,
            normalizeTime(state.seconds),
            normalizeTime(state.milisec)
        ].join(':');

        return (
            <div className="header-with-clock">
                <h1 className="page-header">Hello, world!</h1>
                <TimeDisplay title="Live OClock: " value={date}/>
            </div>
            )
    }

    componentDidMount () {
        window.setInterval(
            this.setNewTime,
            1
        )
    }
}

export default PageHeader;
