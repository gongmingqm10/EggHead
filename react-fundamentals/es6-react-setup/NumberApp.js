import React from 'react';

class NumberApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 0
    };
    this.update = this.update.bind(this);
  }

  update() {
    this.setState({
      val: this._ref.refs.input.value
    })
  }

  render() {
    return (
      <div>
        <NumberInput
          ref={(ref) => this._ref = ref}
          label='Red'
          type='number'
          max='255'
          val={+ this.state.val}
          update={this.update} />
      </div>
    )
  }
}

class NumberInput extends React.Component {
  render() {
    let label = this.props.label ? <label>{this.props.label} {this.props.val}</label> : "";
    return (
      <div>
        <input
          ref='input'
          type={this.props.type}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={this.props.update}/>
        {label}
      </div>
    )
  }
}

NumberInput.PropTypes = {
  min: React.PropTypes.number,
  step: React.PropTypes.number,
  max: React.PropTypes.number,
  label: React.PropTypes.string,
  update: React.PropTypes.func.isRequired,
  type: React.PropTypes.oneOf(['number', 'range'])
};

NumberInput.defaultProps = {
  min: 0,
  step: 1,
  max: 100,
  type: 'number',
  label: 'value = ',
  val: 0
};


export default NumberApp;

