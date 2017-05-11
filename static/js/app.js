/**
 * Created by base on 04.05.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import PageHeader from './components/page-header'
import BlockButtons from './components/buttons/buttons-block'
import BlockCounter from './components/block-counter'


var styles = require('../sass/main.scss');


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          counter: 0,
        };

        this.IncrementFunc = this.IncrementFunc.bind(this);
        this.DecrementFunc = this.DecrementFunc.bind(this);
        this.MultipleFunc = this.MultipleFunc.bind(this);
    }
    IncrementFunc() {
        let newCount = this.state.counter++;

        this.setState({
            counter: newCount
        })
    }
    DecrementFunc() {
        let newCount = this.state.counter--;

        this.setState({
            counter: newCount
        })
    }
    MultipleFunc() {
        let newCount = this.state.counter * 5;

        this.setState({
            counter: newCount
        })
    }
    render () {
        return (
            <main>
                <PageHeader/>
                <BlockCounter counter={this.state.counter}/>
                <BlockButtons inc={this.IncrementFunc} dec={this.DecrementFunc} mul={this.MultipleFunc}/>
            </main>
        )
    }
}

ReactDOM.render(<Main/>, document.getElementById('root'));
