const express = require('express')
const logger = require('./middleware/logger')
const connectDB = require('./services/mongoose')

const app = express()

connectDB()

//middleware
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// API route
app.use('/api/players', require('./routes/api/players'))

module.exports = app