/**
 * Created by base on 12.05.17.
 */
import React from 'react';

class WatchArrow extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 180,
            delay: 0,
            offset: 6,
            start: false
        };

        this._start = this._start.bind(this);
        this.start = this.start.bind(this);
    }
    start () {
        if (this.state.start)
            window.setInterval(
                this._start, this.state.delay
            )
    }
    _start () {
        let newValue = this.state.value + this.state.offset;
        this.setState({
            value: newValue
        })
    }
    componentWillMount() {
        this.setState({
            delay: this.props.delay,
            start: this.props.start
        });
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