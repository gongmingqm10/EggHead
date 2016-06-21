import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Wrapper from './Wrapper';
import WrapperUpdater from './WrapperUpdater';
import AppMixin from './AppMixin';
import NumberApp from './NumberApp';

ReactDOM.render(<App txt="Ming Gong" cat={5}/>, document.getElementById('app'));

ReactDOM.render(<Wrapper />, document.getElementById('wrapper'));

ReactDOM.render(<WrapperUpdater val={0} />, document.getElementById('wrapperUpdater'));

ReactDOM.render(<AppMixin />, document.getElementById('appMixin'));

ReactDOM.render(<NumberApp />, document.getElementById('numberApp'));