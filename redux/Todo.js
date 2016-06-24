import deepFreeze from 'deep-freeze';
import expect from 'expect';

const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [...state, {
          id: action.id,
          text: action.text,
          completed: false
      }];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        return Object.assign({}, todo, action.id === todo.id ? {completed: !todo.completed} : {});
      });
    default:
      return state;
  }
};

// Below are the tests

const testTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };

  const stateAfter = [{
    id: 0,
    text: 'Learn Redux',
    completed: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);

};

const testToggleTodo = () => {
  const stateBefore = [{
    id: 0,
    text: 'Learn Redux',
    completed: false
  }, {
    id: 1,
    text: 'Learn Android',
    completed: false
  }];

  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };

  const stateAfter = [{
    id: 0,
    text: 'Learn Redux',
    completed: false
  }, {
    id: 1,
    text: 'Learn Android',
    completed: true
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testTodo();
testToggleTodo();

console.log('All tests passed');
