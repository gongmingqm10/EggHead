import React from 'react';
import Todo from './Todo';

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_UNCOMPLETED':
      return todos.filter(todo => !todo.completed);
    default:
      return [];
  }
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

const styles = {
  todoList: {
    marginTop: 12
  }
};

TodoList.contextTypes = {
  store: React.PropTypes.object
};

export default TodoList;
