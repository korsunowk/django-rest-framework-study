/**
 * Created by base on 12.05.17.
 */
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

class WatchArrow extends React.Component {
  constructor () {
    super()
    this.state = {
      value: 180,
      offset: 6
    }
    this.interval = true
    this.interval_obj = null
    this.go = false
    this.delay = 0

    this._start = this._start.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
  }
  stop () {
    this.go = false
    this.interval = false
    clearInterval(this.interval_obj)
  }
  start () {
    if (this.go) {
      this.setState({
        value: 180
      })
      this.interval = true
      this.interval_obj = window.setInterval(
                this._start, this.delay
            )
    }
  }
  _start () {
    let newValue = this.state.value + this.state.offset
    this.setState({
      value: newValue
    })
  }
  componentWillReceiveProps (nextProps) {
    if (this.go !== nextProps.start || this.delay !== nextProps.delay) {
      if (nextProps.start) {
        this.go = true
        this.delay = nextProps.delay
        this.start()
      } else { this.stop() }
    }
  }
  render () {
    let Arrow = this.props.type
    switch (Arrow) {
      case 'seconds':
        Arrow = seconds_arrow
        break
      case 'minutes':
        Arrow = minutes_arrow
        break
      case 'hours':
        Arrow = hours_arrow
        break
    }
    return (
      <Arrow
        style={{transform: 'rotate(' + this.state.value + 'deg)'}} />
    )
  }
  componentDidMount () {
    this.start()
  }
}

WatchArrow.propTypes = {
  type: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  start: PropTypes.bool.isRequired
}

const ColoredArrow = styled.div`
    background-color: black;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
  `

let arrow_mixin = `
    margin-top: 7.5px;
    margin-left: 6.5px;
    position: absolute;
    content: '';
`

let seconds_arrow = styled(ColoredArrow)`
    &::after {
      ${arrow_mixin}
      height: 120px;
      border: 1px solid black;
      border-radius: 2px;
    }`

let minutes_arrow = styled(ColoredArrow)`
    &::after {
      ${arrow_mixin}
      height: 100px;
      border: 2px solid black;
      border-radius: 4px;
    }`

let hours_arrow = styled(ColoredArrow)`
    &::after {
      ${arrow_mixin}
      margin-left: 5.5px;
      height: 75px;
      border: 3px solid black;
      border-radius: 4px;
    }
`

export default WatchArrow
