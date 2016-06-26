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

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
  }

  addTodo() {
    const todoInput = this.refs.todoInput;
    let todoText = todoInput.value;
    if (todoText) {
      this.props.onAddTodo(todoText);
      todoInput.value = "";
    }
  }

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
    const filters = [
      {text: 'All', filter: 'SHOW_ALL'},
      {text: 'Completed', filter: 'SHOW_COMPLETED'},
      {text: 'Active', filter: 'SHOW_UNCOMPLETED'}
    ];

    const filterView = filters.map(item => {
      let isCurrentFilter = this.props.visibilityFilter === item.filter ;
      return (
        <span
          style={{
            cursor: 'pointer',
            marginRight: 8,
            textDecoration: isCurrentFilter ? 'underline':'none',
            color: isCurrentFilter ? 'blue': 'black'}}
          key={item.filter}
          onClick={this.props.onVisibilityFilter.bind(this, item.filter)}>
          {item.text}
        </span>
      )
    });

    return (
      <div style={styles.todoContainer}>
        <div>
          <input type="text" ref="todoInput"/>
          <button style={styles.button} onClick={this.addTodo}>Add Todo</button>
        </div>

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
