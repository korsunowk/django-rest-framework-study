/**
 * Created by base on 12.05.17.
 */
import React from 'react';
import styled from 'styled-components';

import WatchArrow from './watch-arrow'

function Watch (props) {
    let start = props.start;

    return (
        <WatchBlock>
            <WatchArrow delay={1000}
                        type="seconds"
                        start={start} />
            <WatchArrow delay={1000 * 60}
                        type="minutes"
                        start={start} />
            <WatchArrow delay={1000 * 60 * 60}
                        type="hours"
                        start={start} />
        </WatchBlock>
    )
}

const WatchBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 3px solid black;
    width: 300px;
    height: 300px;
  `;

export default Watch;