import React, { useState, useEffect } from 'react';
import axios from 'axios';
const base = "api/v1";


function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(base+'/todos')
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

    axios.post(base+'/todos', { title: newTodo })
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
    axios.delete(base+`/todos/${id}`)
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

    axios.put(base+`/todos/${id}`, { completed: updatedTodos.find(todo => todo.id === id).completed })
      .then(response => {
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='container mx-auto bg-mnblue'>
      <div className="flex flex-col items-center h-screen bg-grey-300">
      <h1 className=' py-2 font-bold text-white'>Todo App</h1>
      <div className='flex-col py-2 mb-2' >
      <input aria-label="Todo input"  className="mr-2 shadow appearance-none border rounded w-80 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "type="text" value={newTodo} onChange={handleInputChange} placeholder="Add task." />
      <button className="shadow bg-mint px-3 hover:bg-mint-light focus:shadow-outline focus:outline-none text- font-bold py-1 px-1 rounded" onClick={handleAddTodo} >Add Todo</button>
      {error? (<div className='mt-2 p-1 text-center bg-gray-300' style={{ color: 'red' }}>{error.response.data.message}</div>) : (<div></div>)}
      </div>
      <div style={{borderTop:"solid 2px black"}}></div>
      <ul className="flex  flex-col  w-full " style={{ listStyle: 'none' , maxWidth: '500px'}} >
        {todos.map(todo => (
          <li className='bg-saffron flex p-1 m-1 rounded' key={todo.id}  >
            <input  aria-label="Todo status toggle" className="px-2 "  type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)}   />
            <span className="mx-2 text-center flex-1 " style={{ textDecoration: todo.completed ? 'line-through' : 'none',  color: todo.completed ? '#FB4D3D' : 'black' }}>{todo.title}</span>
            <button className="float-end bg-tomato hover:bg-white hover:text-tomato focus:shadow-outline focus:outline-none text-white font-bold mx-auto mr-1 px-1 rounded" onClick={() => handleDeleteTodo(todo.id)} >Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  
  );
}

export default App;
