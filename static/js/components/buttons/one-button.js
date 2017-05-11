/**
 * Created by base on 11.05.17.
 */
/**
 * Created by base on 10.05.17.
 */
var React = require('react');

class ApiButton extends React.Component {
    render () {
        return (
            <button className={this.props.className} href={this.props.href}>
                {this.props.title}
            </button>
        )
    }
}

export default ApiButton;