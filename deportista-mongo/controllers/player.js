const Player = require('../models/player')

async function findAll(req, res){
    const result = await Player.find()
    res.json(result)
}

async function findById(req, res){
    const exist = await Player.findById(req.params.id)
    if(exist){
        res.json({player:exist})
    }else{
        res.status(400).json({ msg: `No player with the id ${req.params.id}`})
    }
}

async function findByTeam(req, res){
    const exist = await Player.find({team: req.params.team})

    if(exist){
        res.json({player:exist})
    }
    else{
        res.status(400).json({ msg: `No student with the id ${req.params.id}`});
    }
}

async function save(req, res){
    const newPlayer = {
        name: req.body.name,
        team:req.body.team,
        number:req.body.number,
        position:req.body.position,
        height:req.body.height,
    }

    if (!req.body.name || !req.body.team||!req.body.number||!req.body.position||!req.body.height) {
        return res.status(400).json( { msg: 'Please fill all fields' });
    }

    const player = new Player(newPlayer)
    const result = await player.save()
    res.status(201).json({msg: "player made", student:result})
}

async function update(req, res){
    const exist = await Player.findById(req.params.id)


    if (exist) {
        await Player.findOneAndUpdate({_id: req.params.id}, req.body)
        res.status(201).json({msg: "player updated", player: await Player.findById(req.params.id)})
        
    } else {
        res.status(400).json({ msg: `No player with the id ${req.params.id}`});
    }
}

async function deleteById(req, res){
    const exist = Player.findById(req.params.id)


    if (exist) {
        await Player.deleteMany({_id: req.params.id})
        res.json({msg: 'Player deleted', player:await Player.find()})
    } else {
        res.status(400).json({ msg: `No player with the id ${req.params.id}`});
    }
}

async function deleteByName(req, res){
    const exist = Player.find({name: req.params.name})


    if (exist) {
        await Player.deleteMany({name: req.params.name})
        res.json({msg: 'Player deleted', player: await Player.find()})
    } else {
        res.status(400).json({ msg: `No player with the id ${req.params.name}`});
    }
}

module.exports = {findAll, findById, findByTeam, save, update, deleteById, deleteByName}