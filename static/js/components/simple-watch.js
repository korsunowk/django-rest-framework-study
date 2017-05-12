/**
 * Created by base on 11.05.17.
 */
import React from 'react';
import OneWheelLine from './line-in-wheel'


class SimpleWatch extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            red: 1,
            orange: 2,
            yellow: 3,
            green: 4,
            lightblue: 5,
            blue: 6,
            purple: 7,
            stop: false
        };
        this.toogleHaos = this.toogleHaos.bind(this);
    }

    toogleHaos(e) {
        if (e.target.className == 'simple-watch')
        {
            this.setState({
                stop: !this.state.stop
            })
        }
    }
    render () {
        let colors = ["red", "yellow", "orange", "green", "lightblue", "blue", "purple"];
        let lines = [];
        for(let i=0; i< colors.length; i++){
            lines.push(
                <OneWheelLine
                    id={colors[i]}
                    className={"simple-watch__" + colors[i]}
                    rotate={this.state[colors[i]]}
                    key={i}
                    stop={this.state.stop}
                />
            )
        }
        return (
            <div className="block-watch">
                <div className="simple-watch" onClick={this.toogleHaos}>
                    <div className="simple-watch__center">

                    </div>
                    {lines}
                </div>
            </div>
        )
    }
}

export default SimpleWatch;