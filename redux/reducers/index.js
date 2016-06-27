import {combineReducers} from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const TodoReducer = combineReducers({todos, visibilityFilter});

export default TodoReducer;