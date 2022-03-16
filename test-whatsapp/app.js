const express = require('express')
const connectDB = require('./services/mongoose')

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/friends', require('./routes/api/friend'))

module.exports = app