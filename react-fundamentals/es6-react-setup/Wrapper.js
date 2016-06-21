import React from 'react';
import ReactDOM from 'react-dom';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  mount() {
    ReactDOM.render(<App/>, document.getElementById(('container')));
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('container'));
  }

  render() {
    return (
      <div>
        <button onClick={this.mount.bind(this)}>Mount</button>
        <button onClick={this.unmount.bind(this)}>Unmount</button>
        <div id="container"></div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 0
    }
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    console.log('Mounting');
    this.setState({
      multiple: 2
    })
  }

  componentDidMount() {
    console.log('Mounted');
    this.inc = setInterval(this.update, 500);
  }

  componentWillUnmount() {
    console.log('Bye!!!');
    clearInterval(this.inc);
  }

  update() {
    this.setState({
      val: this.state.val + 1
    });
  }

  render() {
    console.log('Rendering');
    return (
      <button onClick={this.update.bind(this)}>{this.state.val * this.state.multiple}</button>
    )
  }
}

export default Wrapper;