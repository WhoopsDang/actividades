const Friend = require('../models/friend')
const qrcode = require('qrcode-terminal')
const {Client} = require('whatsapp-web.js')
const date = new Date()

async function findAll(req, res){
    const result = await Friend.find()
    res.json(result)

}

async function findByDate(req, res){
    const exist = await Friend.find({birthday:req.params.birthday})

    if (exist.length){
        res.json({friend:exist})
    }
    else{
        res.status(400).json({msg:'no one with that birthday exists'})
    }
}

async function add(req, res){
    const newFriend = {
        name: req.body.name,
        number: req.body.number,
        birthday: req.body.birthday,
        region: req.body.region

    }

    if(!req.body.name || !req.body.number || !req.body.birthday|| !req.body.region){
        return res.status(400).json( { msg: 'Please fill all fields' });
    }


    const friend = new Friend(newFriend)
    const result = await friend.save()
    res.status(201).json({msg: "new friend added", student:result})
}

async function deleteById(req, res){
    const exist = Friend.findById(req.params.id)


    if (exist) {
        await Friend.deleteMany({_id: req.params.id})
        res.json({msg: 'Person deleted', friend:await Friend.find()})
    } else {
        res.status(400).json({ msg: `No Person with the id ${req.params.id}`});
    }

}

async function checkDates(req, res){
    if(date.getMonth() + 1 < 10){
        m = '0' + (date.getMonth() + 1).toString()
    }
    else{
        m = (date.getMonth() + 1).toString()
    }
    if(date.getDate() < 10){
        d = '0' + (date.getDate()).toString()
    }
    else{
        d = (date.getDate()).toString()
    }
    
    d = m + "/" + d
    //console.log(d)
    
    const exist = await Friend.find({birthday: d})

    if (exist.length){
        const number = exist.region + exist.number

        const message = "Happy Birthday " + exist.name + " i guess"


        const client = new Client()
        client.on('qr', qr =>{
            qrcode.generate(qr, {small: true})
            
        })
        client.on('ready', () =>{
            console.log('Sending message')
            const chatId = number + "@c.us"
            client.sendMessage(chatId, message)
        })
        client.initialize()
        res.json({msg:"Going to send message"})

    }else{
        res.json({msg:'nobodys birthday'})
    }

}


module.exports = {findAll, findByDate, add, deleteById, checkDates}