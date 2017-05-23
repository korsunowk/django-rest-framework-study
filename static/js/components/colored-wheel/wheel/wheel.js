/**
 * Created by base on 11.05.17.
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import OneWheelLine from './line-in-wheel'


class Wheel extends React.Component {
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
            black: 8,
            gray: 9,
            aqua: 10,
            bisque: 11,
            lime: 12,
            gold: 13,
            silver: 14,
            fuchsia: 15,
            khaki: 16,
            navy: 17,
            stop: false
        };
    }
    render () {
        let colors = [
            "red", "yellow", "orange",
            "green", "lightblue", "blue",
            "purple", "black", "gray",
            "aqua", "bisque", "lime",
            "gold", "silver", "funchsia",
            "khaki", "navy"];
        let lines = [];
        for(let i=0; i< colors.length; i++){
            lines.push(
                <OneWheelLine
                    id={colors[i]}
                    color={colors[i]}
                    rotate={this.state[colors[i]]}
                    key={i}
                    stop={this.state.stop}
                    speed={this.props.speed}
                />
            )
        }
        return (
            <WheelBlock>
                <SimpleWheel>
                    <WheelCenter>

                    </WheelCenter>
                    {lines}
                </SimpleWheel>
            </WheelBlock>
        )
    }
}

Wheel.propTypes = {
    speed: PropTypes.number
};

const WheelCenter = styled.div`
    background-color: black;
    width: 30px;
    height: 30px;
    border-radius: 50%;
`;

const SimpleWheel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 3px solid black;
    width: 300px;
    height: 300px;
`;

const WheelBlock = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 100px;
`;

export default Wheel;