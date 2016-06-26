import React from 'react';
import ReactDOM from 'react-dom';

const filters = [
  {text: 'All', filter: 'SHOW_ALL'},
  {text: 'Completed', filter: 'SHOW_COMPLETED'},
  {text: 'Active', filter: 'SHOW_UNCOMPLETED'}
];

const TodoList = ({todos, onToggleTodo}) => (
  <ul style={styles.todoList}>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        onClick={onToggleTodo.bind(this, todo.id)}
        {...todo}
        />
    )}
  </ul>
);

const Todo = ({onClick, completed, text}) => (
  <li onClick={onClick}
    style={{cursor: 'pointer', textDecoration: completed ? 'line-through' : 'none'}} >
    {text}
  </li>
);

const FilterView = ({onVisibilityFilter, visibilityFilter}) => (
  <div style={styles.filterContainer}>
    Show: {filters.map(item =>
      <FilterItem
        {...item}
        key={item.filter}
        onClick={onVisibilityFilter.bind(this, item.filter)}
        selected={visibilityFilter === item.filter} />
    )}
  </div>
);

const FilterItem = ({selected, onClick, text}) => (
  <span
    style={{
      cursor: 'pointer',
      marginRight: 8,
      textDecoration: selected ? 'underline':'none',
      color: selected ? 'blue': 'black'}}
    onClick={onClick}>
    {text}
  </span>
);

const AddTodo = ({onAddTodo}) => {
  let input;
  return (
    <div>
      <input type="text" ref={(node) => input = node} />
      <button
        style={styles.button}
        onClick={() => {
          onAddTodo(input.value);
          input.value = '';
        }}>
        Add Todo
      </button>
    </div>
  );
};

class TodoApp extends React.Component {
  getVisibleTodos(todos, filter) {
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

  render() {
    return (
      <div style={styles.todoContainer}>
        <AddTodo onAddTodo={ text => {
          if (text) {
            this.props.onAddTodo(text);
          }
        }}/>

        <TodoList
          onToggleTodo = {this.props.onToggleTodo}
          todos={this.getVisibleTodos(this.props.todos, this.props.visibilityFilter)}/>

        <FilterView
          onVisibilityFilter={this.props.onVisibilityFilter}
          visibilityFilter={this.props.visibilityFilter} />
      </div>
    )
  }
}

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


export default TodoApp;
