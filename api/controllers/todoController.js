const db = require('../models')
const todos = db.todo
// controller actions

// 1. create todo
const createTodo = async (req, res) => {
    let info = {
                title: req.body.title,
                description: req.body.description ? req.body.description : "No description yet" ,
                published: 0
            }
    try {
      // Check if the title already exists in the database
      let todo = await todos.findOne({ where :{title : info.title }});
      if (todo!=null) {
        // Title already exists, return a 409 (Conflict) error
        res.status(409).json({ message: 'Title already exists' });
        return;
      }

      // Title does not exist, insert the new todo into the database
      if(req.body.title.length<41){
        let todo = await todos.create(info);
        res.status(201).json(todo);
      }
      else{
        res.status(409).json({ message: 'Title is too long' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error'+err });
    }
  }

// 2. get all todos
const getAllTodos =async (req, res) => {
    try {
      let todo = await todos.findAll()
      console.log(todo)
      res.status(200).json(todo)
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  // 3. update todo by id
  const updateTodo = async (req, res) => {
    try{
    let id = req.params.id
    let todo = await todos.update(req.body, { where: { id: id }})
    res.status(200).send(todo)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// 5. delete todo by id
const deleteTodo = async (req, res) => {
try{
    let id = req.params.id
    await todos.destroy({ where: { id: id }} )
    res.status(200).send('Todo is deleted !')
 }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error'+err })
    }   
}

// 5. delete all todos
const deleteAll = async (req, res) => {
    try{
        await todos.destroy({truncate : true} )
        res.status(200).send('All todos are deleted !')
     }catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error'+err })
        }      
    }

module.exports = {
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo,
    deleteAll
}