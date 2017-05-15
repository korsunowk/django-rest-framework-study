/**
 * Created by base on 11.05.17.
 */
import React from 'react';

import styled from 'styled-components';

const StyledOclock = styled.span`
      display: flex;
      align-items: center;
      font-size: 20px;
      position: absolute;
      right: 100px;
      width: 160px;
  `;

const StyledTimer = styled.span`
      display: flex;
      align-items: center;
      font-size: 20px;
      height: 45px;
      padding-left: 50px;
      padding-right: 50px;
  `;

class TimeDisplay extends React.Component {
    render () {
        let span = this.props.timer? <StyledTimer>{this.props.title} {this.props.value}</StyledTimer> : <StyledOclock> {this.props.title} {this.props.value} </StyledOclock>;
        return span;
    }
}

export default TimeDisplay;