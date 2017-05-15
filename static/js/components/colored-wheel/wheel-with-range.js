/**
 * Created by base on 12.05.17.
 */

import React from 'react';
import styled from 'styled-components';

import Wheel from './wheel/wheel'
import WheelRange from './range-for-wheel/range-input-for-wheel'

const WheelBlock = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: baseline;
  `;

class WheelWithRange extends React.Component {
    constructor () {
        super();
        this.state = {
            range: 50
        };
        this.handlerChangeRange = this.handlerChangeRange.bind(this);
    }
    handlerChangeRange (e) {
        this.setState({
            range: e.target.value
        })
    }
    render () {
        return (
            <WheelBlock>
                <Wheel speed={this.state.range} />
                <WheelRange onChange={this.handlerChangeRange} />
            </WheelBlock>
        )
    }
}

export default WheelWithRange;