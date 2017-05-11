/**
 * Created by base on 11.05.17.
 */
import React from 'react';

class SimpleWatch extends React.Component {
    constructor () {
        super();
        this.interval = false;
        this.intervalObj = null;
        this.simple_interval = false;

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
        this.startOneLine = this.startOneLine.bind(this);
        this.goSimpleHaos = this.goSimpleHaos.bind(this);
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
    goSimpleHaos(obj) {
        this.simple_interval = true;
        let add = this.state[obj.value] + obj.add;
        this.setState({
            [obj.value]: add
        })
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
    startOneLine(e){
        switch (e.target.id){
            case "red": {
                window.setInterval(
                    this.goSimpleHaos({value: 'red', add: 1}), 1
                );
                break
            }
            case "yellow": {
                break
            }
            case "green": {
                break
            }
            case "orange": {
                break
            }
            case "lightblue": {
                break
            }
            case "blue": {
                break
            }
            case "purple": {
                break
            }

        }
    }
    render () {
        return (
            <div className="block-watch">
                <div className="simple-watch" onClick={this.stopHaos}>
                    <div className="simple-watch__center">

                    </div>
                    <div id="red" className="simple-watch__red" style={{transform: "rotate(" + this.state.red + 'deg)'}} onClick={this.startOneLine}>

                    </div>
                    <div id="yellow" className="simple-watch__yellow" style={{transform: "rotate(" + this.state.yellow + 'deg)'}} onClick={this.startOneLine}>

                    </div>
                    <div id="orange" className="simple-watch__orange" style={{transform: "rotate(" + this.state.orange + 'deg)'}} onClick={this.startOneLine}>

                    </div>
                    <div id="green" className="simple-watch__green" style={{transform: "rotate(" + this.state.green + 'deg)'}} onClick={this.startOneLine}>

                    </div>
                    <div id="lightblue" className="simple-watch__lightblue" style={{transform: "rotate(" + this.state.lightblue + 'deg)'}} onClick={this.startOneLine}>

                    </div>
                    <div id="blue" className="simple-watch__blue" style={{transform: "rotate(" + this.state.blue + 'deg)'}} onClick={this.startOneLine}>

                    </div>
                    <div id="purple" className="simple-watch__purple" style={{transform: "rotate(" + this.state.purple + 'deg)'}} onClick={this.startOneLine}>

                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.goHaos();
    }
}

export default SimpleWatch;