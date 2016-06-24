import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>Hello Redux</h1>
        <h2>{this.props.value}</h2>
        <button onClick={this.props.onIncrement}> + </button>
        <button onClick={this.props.onDecrement}> - </button>
      </div>
    )
  }

}

export default App;
