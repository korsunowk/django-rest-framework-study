/**
 * Created by base on 11.05.17.
 */
import React from 'react';
import OneWheelLine from './line-in-wheel'


class SimpleWatch extends React.Component {
    constructor () {
        super();
        this.interval = false;
        this.intervalObj = null;

        this.state = {
            red: 0,
            orange: 0,
            yellow: 0,
            green: 0,
            lightblue: 0,
            blue: 0,
            purple: 0
        };

        this.setHaos = this.setHaos.bind(this);
        this.goHaos = this.goHaos.bind(this);
        this.stopHaos = this.stopHaos.bind(this);
    }
    setHaos(){
        let newRed = this.state.red + 1;
        let newOra = this.state.orange + 2;
        let newYel = this.state.yellow + 3;
        let newGre = this.state.green + 4;
        let newLB = this.state.lightblue + 5;
        let newB = this.state.blue + 6;
        let newPurple = this.state.purple + 7;

        this.setState({
            red: newRed,
            yellow: newYel,
            green: newGre,
            orange: newOra,
            lightblue: newLB,
            blue: newB,
            purple: newPurple
        })
    }
    goHaos() {
        this.intervalObj = window.setInterval(this.setHaos, 1);
        this.interval = true;
    }
    stopHaos(e){

        if (e.target.className == 'simple-watch')
        {
            if (this.interval){
                this.interval = false;
                clearInterval(this.intervalObj);
            }
            else{
                this.interval = true;
                this.goHaos();
            }
        }
    }
    render () {
        let colors = ["red", "yellow", "orange", "green", "lightblue", "blue", "purple"];
        let lines = [];

        for(let i=0; i< colors.length; i++){
            lines.push(
                <OneWheelLine id={colors[i]} className={"simple-watch__" + colors[i]} rotate={this.state[colors[i]]} key={i} />
            )
        }

        return (
            <div className="block-watch">
                <div className="simple-watch" onClick={this.stopHaos}>
                    <div className="simple-watch__center">

                    </div>
                    {lines}
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.goHaos();
    }
}

export default SimpleWatch;