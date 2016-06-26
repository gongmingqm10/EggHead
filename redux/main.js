import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp';
import Redux, {createStore, combineReducers} from 'redux';

const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
          id: action.id,
          text: action.text,
          completed: false
      };
    case 'TOGGLE_TODO':
      return Object.assign(
        {},
        state,
        action.id === state.id ? {completed: !state.completed} : {});
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [...state, todo({}, action)];
    case 'TOGGLE_TODO':
      return state.map(item => todo(item, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const todoApp = combineReducers({todos, visibilityFilter});
const store = createStore(todoApp);

let nextTodoId = 0;

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
      onAddTodo = { text => store.dispatch({
        type: 'ADD_TODO',
        text,
        id: nextTodoId++
      })}
      onToggleTodo = { id => store.dispatch({
        type: 'TOGGLE_TODO',
        id
      })}
      onVisibilityFilter = { filter => store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter
      })}
    />,
    document.getElementById('app')
  )
}

store.subscribe(render);

render();
