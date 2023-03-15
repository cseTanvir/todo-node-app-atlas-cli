const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
let result = dotenv.config(); 


const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/todos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/todos', async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    // Check if the title already exists in the database
    const [rows] = await pool.query('SELECT id FROM todos WHERE title = ?', [title]);
    if (rows.length > 0) {
      // Title already exists, return a 409 (Conflict) error
      res.status(409).json({ message: 'Title already exists' });
      return;
    }
  
    // Title does not exist, insert the new todo into the database
    if(title.length<41){
      const [result] = await pool.query(
        'INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)',
        [title, description, completed]
      );
      const todo = { id: result.insertId, title, description, completed };
    
      res.status(201).json(todo);
    }
    else{
      res.status(409).json({ message: 'Title is too long' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [id]);

    if (rows.length === 0) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE todos SET  completed = ? WHERE id = ?',
      [ completed, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      res.status(200).json({ message: 'Todo updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      res.status(200).json({ message: 'Todo deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/todos', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await pool.query('DELETE FROM todos');
  
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Todo not found' });
      } else {
        res.status(200).json({ message: 'Todo deleted successfully' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
