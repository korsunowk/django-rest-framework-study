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
        return (
            <div className="block-watch">
                <div className="simple-watch" onClick={this.stopHaos}>
                    <div className="simple-watch__center">

                    </div>
                    <OneWheelLine id="red" className="simple-watch__red" rotate={this.state.red} />
                    <OneWheelLine id="yellow" className="simple-watch__yellow" rotate={this.state.yellow} />
                    <OneWheelLine id="orange" className="simple-watch__orange" rotate={this.state.orange} />
                    <OneWheelLine id="green" className="simple-watch__green" rotate={this.state.green} />
                    <OneWheelLine id="lightblue" className="simple-watch__lightblue" rotate={this.state.lightblue} />
                    <OneWheelLine id="blue" className="simple-watch__blue" rotate={this.state.blue} />
                    <OneWheelLine id="purple" className="simple-watch__purple" rotate={this.state.purple} />
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.goHaos();
    }
}

export default SimpleWatch;