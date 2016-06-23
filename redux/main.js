import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux';

// ReactDOM.render(<App />, document.getElementById('app'));

const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);

// This is the callback for store
// whenver there is an dispatcher event.
store.subscribe(() => {
  document.body.innerText = store.getState();
});

document.addEventListener('click', () => {
  store.dispatch({type: 'INCREMENT'});
});
