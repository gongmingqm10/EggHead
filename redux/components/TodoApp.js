import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';

const styles = {
  todoContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 12
  }
};

const TodoApp = () => (
  <div style={styles.todoContainer}>
    <AddTodo />
    <TodoList />
    <Footer />
  </div>
);

export default TodoApp;
