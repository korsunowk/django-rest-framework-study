/**
 * Created by base on 10.05.17.
 */
var React = require('react');

class ApiButton extends React.Component {
    render () {
        return (
            <button className={this.props.className}>
                <a href={this.props.href}>
                    {this.props.title}
                </a>
            </button>
        )
    }
}

export default ApiButton;