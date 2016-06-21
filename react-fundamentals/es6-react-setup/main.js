import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Wrapper from './Wrapper';

ReactDOM.render(<App txt="Ming Gong" cat={5}/>, document.getElementById('app'));

ReactDOM.render(<Wrapper />, document.getElementById('wrapper'));
