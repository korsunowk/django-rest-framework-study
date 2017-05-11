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
        this.state = PageHeader.getTime();

        this.setNewTime = this.setNewTime.bind(this);
    }

    static getTime() {
        let date = new Date();
        return {
            hours : date.getHours(),
            minutes : date.getMinutes(),
            seconds : date.getSeconds(),
            milisec : date.getMilliseconds().toString().substr(1, 3)
        }
    }
    setNewTime(){
        this.setState(
            PageHeader.getTime()
        )
    }

    render() {
        let state = this.state;

        let date = [state.hours, state.minutes, state.seconds, state.milisec]
            .map(normalizeTime)
            .join(':');

        return (
            <div className="header-with-clock">
                <h1 className="page-header">Welcome to Trash!</h1>
                <TimeDisplay title="Live o'clock: " value={date}/>
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
