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

  render() {
    const todoList = this.props.value.todos.map((todo) => {
      return (
        <li key={todo.id}>{todo.text}</li>
      )
    });

    return (
      <div>
        <input type="text" ref="todoInput"/>
        <button onClick={this.addTodo}>Add Todo</button>
        <ul>
          {todoList}
        </ul>
      </div>
    )
  }
}

export default TodoApp;
