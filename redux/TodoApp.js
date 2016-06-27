import React from 'react';
import ReactDOM from 'react-dom';

let nextTodoId = 0;

const filters = [
  {text: 'All', filter: 'SHOW_ALL'},
  {text: 'Completed', filter: 'SHOW_COMPLETED'},
  {text: 'Active', filter: 'SHOW_UNCOMPLETED'}
];

const styles = {
  todoContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 12
  },
  button: {
    marginLeft: 6
  },
  todoList: {
    marginTop: 12
  },
  filterContainer: {
    flexDirection: 'row'
  }
};

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_UNCOMPLETED':
      return todos.filter(todo => !todo.completed);
    defalt:
      return [];
  }
};

const Todo = ({onClick, completed, text}) => (
  <li onClick={onClick}
    style={{cursor: 'pointer', textDecoration: completed ? 'line-through' : 'none'}} >
    {text}
  </li>
);

const FilterItem = ({selected, onClick, text}) => (
  <span
    style={{
      cursor: 'pointer',
      marginRight: 8,
      textDecoration: selected ? 'underline':'none',
      color: selected ? 'blue': 'black'}}
    onClick={onClick} >
    {text}
  </span>
);

const AddTodo = ({store}) => {
  let input;
  return (
    <div>
      <input type="text" ref={(node) => input = node} />
      <button
        style={styles.button}
        onClick={() => {
          if (input.value.trim()) {
            store.dispatch({
              type: 'ADD_TODO',
              text: input.value,
              id: nextTodoId++
            })
            input.value = '';
          }
        }}>
        Add Todo
      </button>
    </div>
  );
};

class TodoList extends React.Component {
  componentDidMount() {
    const {store} = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let store = this.props.store;
    let state = store.getState();
    return (
      <ul style={styles.todoList}>
        {getVisibleTodos(state.todos, state.visibilityFilter).map(todo =>
          <Todo
            key={todo.id}
            onClick={() => store.dispatch({type: 'TOGGLE_TODO', id: todo.id})}
            {...todo}
          />
        )}
      </ul>
    )
  }
}

class Footer extends React.Component {
  componentDidMount() {
    const {store} = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    let store = this.props.store;
    let {visibilityFilter} = store.getState();
    return (
      <div style={styles.filterContainer}>
        Show: {filters.map(item =>
          <FilterItem
            {...item}
            key={item.filter}
            onClick={() => store.dispatch({type: 'SET_VISIBILITY_FILTER', filter: item.filter})}
            selected={visibilityFilter === item.filter}
          />
        )}
      </div>
    )
  }
}

const TodoApp = ({store}) => (
  <div style={styles.todoContainer}>
    <AddTodo store={store} />
    <TodoList store={store} />
    <Footer store={store} />
  </div>
);

export default TodoApp;
