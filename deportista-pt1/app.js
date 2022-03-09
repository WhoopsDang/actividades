const express = require('express')
const logger = require('./middleware/logger')

const app = express()


//middleware
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// API route
app.use('/api/players', require('./routes/api/players'))

module.exports = app