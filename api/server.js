const express = require('express')
const cors = require('cors')

// expess initializes
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// router
const router = require('./routes/todoRoutes.js')
app.use('/api/v1', router)

//port
const PORT = process.env.PORT || 5000

//server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})