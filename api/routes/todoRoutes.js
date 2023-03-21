// import controllers 
const todoController = require('../controllers/todoController')
// router instance
const router = require('express').Router()
// defining routes
 router.get('/todos', todoController.getAllTodos)
 router.post('/todos',todoController.createTodo)
 router.put('/todos/:id',todoController.updateTodo)
 router.delete('/todos/:id',todoController.deleteTodo)
 router.delete('/delete-all',todoController.deleteAll)

module.exports = router