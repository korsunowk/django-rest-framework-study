/**
 * Created by base on 11.05.17.
 */
import React from 'react';
import ApiButton from './one-button'

import styled from 'styled-components';

function BlockButtons (props) {
    return (
        <ButtonsBlock>
            <ApiButton title='*5' href="/"
                       button_type="counter"
                       onClick={props.mul}/>
            <ApiButton title='+1'
                       href="/"
                       onClick={props.inc}/>
            <ApiButton title='Clear'
                       href="/"
                       onClick={props.clear}/>
            <ApiButton title='-1'
                       href="/"
                       onClick={props.dec}/>
            <ApiButton title='/5'
                       href="/"
                       onClick={props.dev}/>
        </ButtonsBlock>
    )
}

const ButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20% 0 20%;
`;

export default BlockButtons;