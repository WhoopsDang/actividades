const Friend = require('../models/friend')
const qrcode = require('qrcode-terminal')
const {Client} = require('whatsapp-web.js')
const date = new Date()
const FriendController = {}

FriendController.findAll = async (req, res) => {
    const result = await Friend.find().lean()
    res.render('friends', {
        title: "Friends",
        friends: result
    })

}

async function findByDate(req, res){
    
}

FriendController.add = async (req, res) =>{
    const newFriend = {
        name: req.body.name,
        number: req.body.number,
        birthday: req.body.birthday,
        region: req.body.region

    }

    if(!req.body.name || !req.body.number || !req.body.birthday|| !req.body.region){
        return res.status(400).json( { msg: 'IN' });
    }


    const friend = new Friend(newFriend)
    await friend.save()
    const result = await Friend.find().lean()
    res.render('friends',{
        title: "Friends",
        friends: result
    })

}

FriendController.deleteById = async (req, res) => {
    console.log(req.params.id)
    const exist = Friend.findById(req.params.id)


    if (exist) {
        await Friend.deleteMany({_id: req.params.id})
        const result = await Friend.find().lean()
        res.render('friends',{
            title: "Friends",
            friends: result
        })
    } else {
        res.status(400).json({ msg: `No Person with the id ${req.params.id}`});
    }
}

FriendController.checkDates = async (req, res) =>{
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
    
    const exist = await Friend.find({birthday: d}).lean()

    if (exist.length){
        
        const result = await Friend.find({birthday: d}).lean()
        
        res.render('check',{
            title: "Birthdays",
            friends: result
        })
        

    }

}

FriendController.sendMessage = async (req, res) =>{
    console.log('in')
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
    
    const exist = Friend.find({birthday: d})
    
    if(exist){
        const result = await Friend.find({birthday:d})
        const client = new Client()
            client.on('qr', qr =>{
                qrcode.generate(qr, {small: true})
                
            })
        result.forEach(friend => {
            const number = friend.region + friend.number
            const message = "Happy Birthday " + friend.name + " i guess"

            
            
            
            client.on('ready', () =>{
                console.log('Sending message')
                const chatId = number.substring(1) + "@c.us"
                client.sendMessage(chatId, message)
                console.log(chatId, message)
            })  
            
            //res.json({msg:"Going to send message"})
            console.log('sent')
    
    
            
            
        });
        client.initialize()
        res.render('index',{
            title: "Message has been sent" 
        })
        

        
    }
    
        

    


}

module.exports = FriendController