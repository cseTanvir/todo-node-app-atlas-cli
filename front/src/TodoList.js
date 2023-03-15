import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, toggleCompleted }) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleCompleted={toggleCompleted} />
      ))}
    </div>
  );
};

export default TodoList;
