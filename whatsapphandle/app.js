const express = require('express')
const connectDB = require('./services/mongoose')
const exphbs = require('express-handlebars')
const path = require('path')
const logger = require('./middlewares/logger');

const app = express()


connectDB()

app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')


app.use(logger)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//API
app.use('/api/friends', require('./routes/api/friend'))

//routes
app.use(require('./routes/index'))











module.exports = app