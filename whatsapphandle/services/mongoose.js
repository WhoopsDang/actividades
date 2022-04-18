const mongoose = require('mongoose')


const connectMongo = () => {

    console.log("Connecting to Mongo")
    mongoose.connect('mongodb://localhost:27017/api-friends').then(()=>{
        console.log("Connected to Mongo")
    }).catch(err =>{
        console.log(err)
        console.log("could not connect")
    })

}


module.exports = connectMongo