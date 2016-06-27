import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import TodoReducer from './reducers/index';
import TodoApp from './components/TodoApp';

ReactDOM.render(
  <Provider store={createStore(TodoReducer)}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);
