/**
 * Created by base on 12.05.17.
 */
import React from 'react';

class WatchArrow extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 180,
            offset: 6
        };
        this.interval = true;
        this.interval_obj = null;
        this.go = false;
        this.delay = 0;

        this._start = this._start.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }
    stop() {
        this.go = false;
        this.interval = false;
        clearInterval(this.interval_obj)
    }
    start () {
        if (this.go) {
            this.setState({
               value: 180
            });
            this.interval = true;
            this.interval_obj = window.setInterval(
                this._start, this.delay
            )
        }
    }
    _start () {
        let newValue = this.state.value + this.state.offset;
        this.setState({
            value: newValue
        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.go != nextProps.start || this.delay != nextProps.delay)
        {
            if (nextProps.start){
                this.go = true;
                this.delay = nextProps.delay;
                this.start();
            }
            else
                this.stop()
        }
    }
    render () {
        return (
            <div
                className={"watch__arrow " + this.props.type}
                style={{transform: "rotate(" + this.state.value + 'deg)'}}>


            </div>
        )
    }
    componentDidMount () {
        this.start()
    }
}

export default WatchArrow;