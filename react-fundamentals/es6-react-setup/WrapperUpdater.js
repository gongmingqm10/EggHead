import React from 'react';
import ReactDOM from 'react-dom';

class WrapperUpdater extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {
      increasing: false
    }
  }

  update() {
    ReactDOM.render(<WrapperUpdater val={this.props.val + 1}/>, document.getElementById('wrapperUpdater'));
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps.val);
    this.setState({
      increasing: nextProps.val > this.props.val
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldCmponentUpdate", nextProps.val);
    return nextProps.val % 5 === 0;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
  }

  render() {
    console.log("increasing", this.state.increasing);
    return(
      <button onClick={this.update}>{this.props.val}</button>
    )
  }
}

export default WrapperUpdater;