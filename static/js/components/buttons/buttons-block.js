/**
 * Created by base on 11.05.17.
 */
import React from 'react';
import Button from './one-button'

class BlockButtons extends React.Component {
    render() {
        return (
            <div className="buttons-block">
                <Button className="first-button" title='+1' href="/" onClick={this.props.inc}/>
                <Button className="second-button" title='-1' href="/" onClick={this.props.dec}/>
                <Button className="third-button" title='*5' href="/" onClick={this.props.mul}/>
            </div>
        )
    }
}

export default BlockButtons;