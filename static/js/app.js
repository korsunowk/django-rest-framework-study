/**
 * Created by base on 04.05.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import PageHeader from './components/page-header'
import BlockButtons from './components/buttons/buttons-block'
import BlockCounter from './components/counter/block-counter'
import WheelWithRange from './components/colored-wheel/wheel-with-range'


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          counter: 0,
        };

        this.IncrementFunc = this.IncrementFunc.bind(this);
        this.DecrementFunc = this.DecrementFunc.bind(this);
        this.MultipleFunc = this.MultipleFunc.bind(this);
        this.ClearFunc = this.ClearFunc.bind(this);
        this.DevFunc = this.DevFunc.bind(this);
    }

    IncrementFunc() {
        let newCount = ++this.state.counter;
        this.setState({
            counter: newCount
        })
    }
    ClearFunc() {
        this.setState({
            counter: 0
        })
    }
    DecrementFunc() {
        let newCount = --this.state.counter;
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
    DevFunc() {
        let newCount = this.state.counter / 5;

        this.setState({
            counter: newCount
        })
    }
    render () {
        return (
            <MainBlock>
                <PageHeader/>
                <BlockCounter counter={this.state.counter}/>
                <BlockButtons inc={this.IncrementFunc} dec={this.DecrementFunc} mul={this.MultipleFunc} clear={this.ClearFunc} dev={this.DevFunc} />
                <WheelWithRange />
            </MainBlock>
        )
    }
}

const MainBlock = styled.main`
    display: flex;
    justify-content: center;
    flex-direction: column;
  `;

ReactDOM.render(<Main/>, document.getElementById('root'));
