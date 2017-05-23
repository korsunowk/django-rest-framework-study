/**
 * Created by base on 12.05.17.
 */
import React from 'react';
import styled from 'styled-components';

function WheelRange(props) {
    return (
        <WheelBlock>
            <span>
                Speed:
            </span>
            <RangeInput
                onChange={props.onChange}
                type="range"
                min="1"
                max="100"
            />
        </WheelBlock>
    )
}

const WheelBlock = styled.div`
    padding-left: 50px;
  `;

export default WheelRange;