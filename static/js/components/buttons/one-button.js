/**
 * Created by base on 11.05.17.
 */
/**
 * Created by base on 10.05.17.
 */
import React from 'react';
import styled from 'styled-components';

const buttons_style = styled.button`
    width: 150px;
    height: 45px;
    font-size: 21px;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
      background-color: #ffffff;
    }
  `;

let TimeButton = styled(buttons_style)`
      background-color: #ffcd13;
      border: 2px solid #ffb41e;
      margin-left: 200px;
  `;

let CountButton = styled(buttons_style)`
      background-color: yellowgreen;
      border: 2px solid green;
  `;

class ApiButton extends React.Component {
    render () {
        let OneButton = null;

        switch (this.props.button_type) {
            case "time-button": {
                OneButton = TimeButton;
                break;
            }
            default : {
                OneButton = CountButton;
                break;
            }
        }

        return (
            <OneButton href={this.props.href} onClick={this.props.onClick}>
                {this.props.title}
            </OneButton>
        )
    }
}

export default ApiButton;