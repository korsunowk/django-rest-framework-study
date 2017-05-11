/**
 * Created by base on 11.05.17.
 */
import React from 'react';
import Button from './one-button'

class BlockButtons extends React.Component {
    render() {
        return (
            <div className="buttons-block">
                <Button className="mul-button" title='*5' href="/" onClick={this.props.mul}/>
                <Button className="inc-button" title='+1' href="/" onClick={this.props.inc}/>
                <Button className="null-button" title='Clear' href="/" onClick={this.props.clear}/>
                <Button className="dec-button" title='-1' href="/" onClick={this.props.dec}/>
                <Button className="dev-button" title='/5' href="/" onClick={this.props.dev}/>
            </div>
        )
    }
}

export default BlockButtons;