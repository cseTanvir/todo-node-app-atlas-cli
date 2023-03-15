import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === '') {
      return;
    }

    axios.post('/todos', { title: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
        setError('');
      })
      .catch(error => {
        setError(error);
        console.log(error);
      });
  };

  const handleDeleteTodo = (id) => {
    axios.delete(`/todos/${id}`)
      .then(response => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    axios.put(`/todos/${id}`, { completed: updatedTodos.find(todo => todo.id === id).completed })
      .then(response => {
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='container mx-auto bg-gray-500'>
      <div className="flex flex-col items-center h-screen bg-grey-300">
      <h1 className=' py-2 font-bold text-white'>Todo App</h1>
      <div className='flex-col py-2 mb-2' >
      <input className="mr-2 shadow appearance-none border rounded w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "type="text" value={newTodo} onChange={handleInputChange} />
      <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-1 rounded" onClick={handleAddTodo}>Add Todo</button>
      {error? (<div className='mt-2 p-1 text-center bg-gray-300' style={{ color: 'red' }}>{error.response.data.message}</div>) : (<div></div>)}
      </div>
      <div style={{borderTop:"solid 2px black"}}></div>


      <ul className="flex  flex-col  w-full " style={{ listStyle: 'none' , maxWidth: '450px'}} >
        {todos.map(todo => (
          <li className='bg-gray-600 flex p-1 m-1 rounded' key={todo.id}  >
            <input className="px-2 "  type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)}   />
            <span className="mx-2 text-center flex-1 " style={{ textDecoration: todo.completed ? 'line-through' : 'none',  color: todo.completed ? 'aqua' : 'white' }}>{todo.title}</span>
            <button className="float-end bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold mx-auto mr-1 px-1 rounded" onClick={() => handleDeleteTodo(todo.id)} >Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  
  );
}

export default App;
