/**
 * Created by base on 11.05.17.
 */
import React from 'react';

class SimpleWatch extends React.Component {
    constructor () {
        super();
        this.state = {
            seconds: 0,
            minutes: 0,
            hours: 0
        };

        this.goHaos = this.goHaos.bind(this)
    }
    goHaos(){
        let newSec = this.state.seconds + 5;
        let newMin = this.state.minutes + 3;
        let newHour = this.state.hours + 1;

        this.setState({
            seconds: newSec,
            minutes: newMin,
            hours: newHour
        })
    }
    render () {
        return (
            <div className="block-watch">
                <div className="simple-watch">
                    <div className="simple-watch__center">

                    </div>
                    <div className="simple-watch__seconds" style={{transform: "rotate(" + this.state.seconds + 'deg)'}}>

                    </div>
                    <div className="simple-watch__minutes" style={{transform: "rotate(" + this.state.minutes + 'deg)'}}>

                    </div>
                    <div className="simple-watch__hours" style={{transform: "rotate(" + this.state.hours + 'deg)'}}>

                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        window.setInterval(this.goHaos, 1)
    }
}

export default SimpleWatch;