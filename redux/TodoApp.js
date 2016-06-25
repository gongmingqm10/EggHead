import React from 'react';
import ReactDOM from 'react-dom';

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

    const todoList = this.getVisibleTodos(this.props.todos, this.props.visibilityFilter).map((todo) => {
      return (
        <li
          onClick = {this.props.onToggleTodo.bind(this, todo.id)}
          style={{cursor: 'pointer', textDecoration: todo.completed ? 'line-through' : 'none'}}
          key={todo.id}>
          {todo.text}
        </li>
      )
    });

    return (
      <div style={styles.todoContainer}>
        <div>
          <input type="text" ref="todoInput"/>
          <button style={styles.button} onClick={this.addTodo}>Add Todo</button>
        </div>

        <ul style={styles.todoList}>
          {todoList}
        </ul>
        <div style={styles.filterContainer}>Show: {filterView}</div>
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
}


export default TodoApp;
