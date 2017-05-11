/**
 * Created by base on 11.05.17.
 */
import React from 'react';

class OneWheelLine extends React.Component {
    constructor () {
        super();
        this.state = {
           value: false
        };

        this.startOneLine = this.startOneLine.bind(this);
        this.goSimpleHaos = this.goSimpleHaos.bind(this);
    }
    goSimpleHaos() {
        let add = this.state.value + 1;
        this.setState({
            value: add
        })
    }
    startOneLine(){

    }
    render () {
        let rotate = !this.state.value ? this.props.rotate: this.state.value;

        return (
                <div
                    id={this.props.id}
                    className={this.props.className}
                    style={{transform: "rotate(" + rotate + 'deg)'}}
                    onClick={this.startOneLine} >
                </div>
        )
    }
}

export default OneWheelLine;