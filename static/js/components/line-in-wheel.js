/**
 * Created by base on 11.05.17.
 */
import React from 'react';

class OneWheelLine extends React.Component {
    constructor (props) {
        super(props);

        this.intervalObj = null;
        this.interval = false;

        this.state = {
            value: 0,
            rotate: 0,
            speed: 100,
            stop: false
        };

        this.toggleRotate = this.toggleRotate.bind(this);
        this.setRotate = this.setRotate.bind(this);
        this.updateInterval = this.updateInterval.bind(this);
    }
    updateInterval () {
        clearInterval(this.intervalObj);
        this.intervalObj = window.setInterval(this.setRotate, this.state.speed);
    }
    toggleRotate() {
        if (!this.state.stop) {
            if (this.interval){
                this.interval = false;
                clearInterval(this.intervalObj);
            }
            else{
                this.interval = true;
                this.intervalObj = window.setInterval(this.setRotate, this.state.speed);
            }
        }
    }
    setRotate(){
        let newValue = this.state.value + this.state.rotate;
        this.setState({
            value: newValue
        })
    }
    componentWillMount() {
        this.setState({
            stop: this.props.stop,
            rotate: this.props.rotate,
            speed: this.props.speed
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            speed: nextProps.speed
        });
        this.updateInterval()
    }
    render () {
        return (
                <div
                    id={this.props.id}
                    className={this.props.className}
                    style={{transform: "rotate(" + this.state.value + 'deg)'}}
                    onClick={this.toggleRotate}
                    key={this.props.key} >
                </div>
        )
    }
    componentDidMount () {
        this.toggleRotate();
    }
}

export default OneWheelLine;