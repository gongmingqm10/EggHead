import React from 'react';

let Mixin = InnerComponent => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {val: 0};
    this.update = this.update.bind(this);
  }

  update() {
    this.setState({val: this.state.val + 1})
  }

  componentWillMount() {
    console.log('Will Mount')
  }

  render() {
    return (
      <InnerComponent
        update={this.update}
        {...this.state}
        {...this.props} />
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.update}>
      {props.txt} - {props.val}
    </button>
  )
};

const Label = (props) => {
  return (
    <label onMouseOver={props.update}>
      {props.txt} - {props.val}
    </label>
  )
};

let ButtonMixin = Mixin(Button);
let LabelMixin = Mixin(Label);

class AppMixin extends React.Component {
  render() {
    return (
      <div>
        <ButtonMixin txt="Button"/>
        <LabelMixin txt="Label"/>
      </div>
    )
  }
}

export default AppMixin