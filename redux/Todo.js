import deepFreeze from 'deep-freeze';
import expect from 'expect';
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

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   }
// };
// const combineReducers = (reducers) => {
//   return (state ={}, action) => {
//     return Object.keys(reducers).reduce(
//       (nextState, key) => {
//         nextState[key] = reducers[key](state[key], action);
//         return nextState;
//       },
//       {}
//     )
//   }
// }


const todoApp = combineReducers({todos, visibilityFilter});

// begin to use the redux and dispatch actions
const store = createStore(todoApp);

console.log('Start Dispatch Action...');

console.log('1. Add a learn android todo');
store.dispatch({type:'ADD_TODO', id: 0, text: 'Learn Android'});
console.log(store.getState());

console.log('2. Add a learn JAVA todo');
store.dispatch({type:'ADD_TODO', id: 1, text: 'Learn JAVA'});
console.log(store.getState());

console.log('3. Toggle learn java');
store.dispatch({type:'TOGGLE_TODO', id: 1});
console.log(store.getState());

console.log('4. Set the show completed filter');
store.dispatch({type:'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED'});
console.log(store.getState());

console.log('Dispatch Action Ended...');


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

const testVisibilityFilter = () => {
  const stateBefore = 'SHOW_ALL';
  const action = {
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
  };
  const stateAfter = 'SHOW_COMPLETED';
  deepFreeze(stateBefore);

  expect(visibilityFilter(stateBefore, action)).toEqual(stateAfter);
};

testTodo();
testToggleTodo();
testVisibilityFilter();

console.log('All tests passed');
