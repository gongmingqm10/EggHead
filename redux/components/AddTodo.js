import React from 'react';

let nextTodoId = 0;

const AddTodo = (props, {store}) => {
  let input;
  return (
    <div>
      <input type="text" ref={(node) => input = node}/>
      <button
        style={styles.button}
        onClick={() => {
          if (input.value.trim()) {
            store.dispatch({
              type: 'ADD_TODO',
              text: input.value,
              id: nextTodoId++
            });
            input.value = '';
          }
        }}>
        Add Todo
      </button>
    </div>
  );
};

const styles = {
  button: {
    marginLeft: 6
  }
};

AddTodo.contextTypes = {
  store: React.PropTypes.object
};

export default AddTodo;
