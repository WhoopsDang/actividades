const app = require('./app')
const exphbs = require('express-handlebars')


const port = 5000
//middleware
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Homepage (nothing yet)


app.listen(port, () => console.log("running Express!"))

