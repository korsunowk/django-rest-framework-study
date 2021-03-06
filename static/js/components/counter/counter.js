/**
 * Created by base on 11.05.17.
 */
import React from 'react'

import styled from 'styled-components'

const SpanCounter = styled.span`
    text-align: center;
    padding-bottom: 20px;
    font-size: 30px;  
  `

function Counter (props) {
  return (
    <SpanCounter>Counter: {props.counter}</SpanCounter>
  )
}

export default Counter
