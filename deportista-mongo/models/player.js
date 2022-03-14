const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
    name: String,
    team: String,
    number: Number,
    position: String,
    height: Number

})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player