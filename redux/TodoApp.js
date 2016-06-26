import React from 'react';
import ReactDOM from 'react-dom';

const filters = [
  {text: 'All', filter: 'SHOW_ALL'},
  {text: 'Completed', filter: 'SHOW_COMPLETED'},
  {text: 'Active', filter: 'SHOW_UNCOMPLETED'}
];

class Todo extends React.Component {
  render() {
    return(
      <li onClick={this.props.onClick}
        style={{cursor: 'pointer', textDecoration: this.props.completed ? 'line-through' : 'none'}}
        >
        {this.props.text}
      </li>
    )
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul style={styles.todoList}>
        {this.props.todos.map(todo =>
          <Todo
            key={todo.id}
            onClick={this.props.onToggleTodo.bind(this, todo.id)}
            {...todo}
            />
        )}
      </ul>
    )
  }
}

class FilterView extends React.Component {
  render() {
    return (
      <div style={styles.filterContainer}>
        Show: {filters.map(item =>
          <FilterItem
            {...item}
            key={item.filter}
            onClick={this.props.onVisibilityFilter.bind(this, item.filter)}
            selected={this.props.visibilityFilter === item.filter} />
        )}
      </div>
    )
  }
}

class FilterItem extends React.Component {
  render() {
    return (
      <span
        style={{
          cursor: 'pointer',
          marginRight: 8,
          textDecoration: this.props.selected ? 'underline':'none',
          color: this.props.selected ? 'blue': 'black'}}
        onClick={this.props.onClick}>
        {this.props.text}
      </span>
    )
  }
}

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
