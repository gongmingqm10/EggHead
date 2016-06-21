import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      red: 128,
      green: 128,
      blue: 128
    };
    this.update = this.update.bind(this);
  }

  update(e) {
    this.setState({
      red: this._red.refs.inputSlider.value,
      green: this._green.refs.inputSlider.value,
      blue: this._blue.refs.inputSlider.value
    });
  }

  render() {
    return (
      <div>
        <h1> Color Palette </h1>
        <Slider ref={(ref) => this._red  = ref} txt={this.state.red} update={this.update} />
        <br/>
        <Slider ref={(ref) => this._green  = ref} txt={this.state.green} update={this.update} />
        <br/>
        <Slider ref={(ref) => this._blue  = ref} txt={this.state.blue} update={this.update} />
      </div>
    );
  }
}

class Slider extends React.Component {
  render() {
    return(
      <div>
        <input ref="inputSlider" type="range" min="0" max="255" onChange={this.props.update} />
        <span> {this.props.txt}</span>
      </div>
    )
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
