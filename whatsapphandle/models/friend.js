const mongoose = require('mongoose')
const Schema = mongoose.Schema

const friendSchema = new Schema({
    name: String,
    number: String,
    birthday: String,
    region: String

})

const Friend = mongoose.model('Friend', friendSchema)

module.exports = Friend