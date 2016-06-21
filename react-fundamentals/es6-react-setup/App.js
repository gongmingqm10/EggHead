import React from 'react';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      txt: 'Text from the state',
      cat: 0
    };
  }

  update(e) {
    this.setState({txt: e.target.value})
  }

  render() {
    return (
      <div>
        <h1>Hello React World </h1>
        <p>This will show the value of txt: {this.props.txt}</p>
        <p>Hello State: {this.state.txt} </p>

        <input type="text" onChange={this.update.bind(this)} />

      </div>
    );
  }
}

App.propTypes = {
  txt: React.PropTypes.string,
  cat: React.PropTypes.number.isRequired
}

App.defaultProps = {
  txt: 'gongmingqm10'
}

export default App
