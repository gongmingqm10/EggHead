import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import {createStore} from 'redux';

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

const createStore = (render) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const   = (action) => {
    state = render(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return {getState, dispatch, subscribe};
}

const store = createStore(counter);

// This is the callback for store
// whenver there is an dispatcher event.
const render = () => {
  document.body.innerText = store.getState();
  if (store.getState() === 10) {
    // Unsubscribe!!
    subsciption();
  }
};

var subsciption = store.subscribe(render);

render();

document.addEventListener('click', () => {
  store.dispatch({type: 'INCREMENT'});
});
