/**
 * Created by base on 11.05.17.
 */
import React from 'react';

class OneWheelLine extends React.Component {
    constructor () {
        super();

        this.intervalObj = null;
        this.interval = false;

        this.state = {
            value: 0,
            rotate: 0,
            stop: false
        };

        this.toggleRotate = this.toggleRotate.bind(this);
        this.setRotate = this.setRotate.bind(this);
    }
    toggleRotate() {
        if (this.interval){
            this.interval = false;
            clearInterval(this.intervalObj);
        }
        else{
            this.interval = true;
            this.intervalObj = window.setInterval(this.setRotate, 100);
        }
    }
    setRotate(){
        let newValue = this.state.value + this.state.rotate;
        this.setState({
            value: newValue
        })
    }
    componentWillMount() {
        if (this.props.stop)
        {
            this.setState({
                stop: this.props.stop
            })
        }
        this.setState({
            rotate: this.props.rotate
        });
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