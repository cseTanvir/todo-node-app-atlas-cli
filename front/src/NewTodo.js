import React, { useState } from 'react';

const NewTodo = ({ addTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addTodo({
      title: title,
      completed: false
    });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Add a new Todo" value={title} onChange={e => setTitle(e.target.value)} />
      <button  type="submit">Add</button>
    </form>
  );
};

export default NewTodo;
