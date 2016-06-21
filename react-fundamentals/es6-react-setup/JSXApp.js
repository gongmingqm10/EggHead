import React from 'react';

class JSXApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      input: '/* Add your jsx here */',
      output: ''
    };
    this.update = this.update.bind(this);
  }

  update(e) {
    let text = e.target.value;
    try {
      this.setState({
        output: babel.transform(text, {
          stage: 0,
          loose: 'all'
        }).code,
        error: ''
      })
    } catch (error) {
      this.setState({
        error: error.message,
        output: ''
      })
    }
  }

  render() {
    return (
      <div>
        <header>{this.state.error}</header>
        <div class="jsx-inner-container">
          <textarea onChange={this.update}/>
          <pre>{this.state.output}</pre>
        </div>

      </div>
    )
  }
}

export default JSXApp;