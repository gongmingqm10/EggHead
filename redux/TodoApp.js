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
      textDecoration: selected ? 'none':'underline',
      color: selected ? 'black':'blue'}}
    onClick={onClick} >
    {text}
  </span>
);

const AddTodo = (props, {store}) => {
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

AddTodo.contextTypes = {
  store: React.PropTypes.object
};

class TodoList extends React.Component {
  componentDidMount() {
    const {store} = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {store} = this.context;
    const state = store.getState();
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

TodoList.contextTypes = {
  store: React.PropTypes.object
}

class Footer extends React.Component {
  componentDidMount() {
    const {store} = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const {store} = this.context;
    const {visibilityFilter} = store.getState();
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

Footer.contextTypes = {
  store: React.PropTypes.object
};

class TodoApp extends React.Component {
  getChildContext() {
    return {
      store: this.props.store
    }
  }
  render() {
    return (
      <div style={styles.todoContainer}>
        <AddTodo />
        <TodoList />
        <Footer />
      </div>
    )
  }
}

TodoApp.childContextTypes = {
  store: React.PropTypes.object
};

export default TodoApp;
