const express = require('express');
const fs = require('fs')
const router = express.Router();
const uuid = require('uuid');
const file = fs.readFileSync('Players.json')



// Get all players
router.get('/', (req, res) => {
    
    res.json(JSON.parse(file))
    
    }
    
    );

    // Get single player
router.get('/:id', (req, res) => {
    // res.send(req.params.id);
        players = JSON.parse(file)
        const exist = players.some(player => player.id === parseInt(req.params.id));
        if (exist) {
            res.json(players.filter(player => player.id === parseInt(req.params.id)));
        } else {
            res.status(400).json({ msg: `No player with the id ${req.params.id}`});
        }

    

    
});

// Create new player
router.post('/', (req, res) => {
    const newPlayer = {
        id: uuid.v4(),
        name: req.body.name,
        team: req.body.team,
        number: req.body.number,
        position: req.body.position,
        height: req.body.height
    }

    if (!req.body.name || !req.body.team || !req.body.number || !req.body.position|| !req.body.height) {
        return res.status(400).json( { msg: 'Please fill all necessary stats' });
    }

    
    data = JSON.parse(file)

    data.push(newPlayer)
    
    d = JSON.stringify(data)

    fs.writeFileSync('Players.json', d)

    
    
    res.json(data);
    // res.redirect('/');
});


// Update player
router.put('/:id', (req, res) => {
    players = JSON.parse(file)
    const exist = players.some(player => player.id === parseInt(req.params.id));

    if (exist) {
        const updPlayer = req.body;
        players.forEach(player => {
            if (player.id === parseInt(req.params.id)) {
                player.name = updPlayer.name ? updPlayer.name : player.name;
                player.team = updPlayer.team ? updPlayer.team : player.team;
                player.number = updPlayer.number ? updPlayer.number : player.number;
                player.position = updPlayer.position ? updPlayer.position : player.position;
                player.height = updPlayer.height? updPlayer.height : player.height;

                res.json({ msg: 'Player updated', player });
            }
        });
        data = JSON.stringify(players)
        fs.writeFileSync('Players.json', data)

    } else {
        res.status(400).json({ msg: `No Player with the id ${req.params.id}`});
    }
});


router.delete('/:id', (req, res)=>{
    players = JSON.parse(file)
    const exist = players.some(player => player.id === parseInt(req.params.id));
    const i = 0

    if (exist){
        players.forEach((player, index) =>{
            if(player.id === parseInt(req.params.id)){
                res.json({ msg: 'Player deleted', player });
                players.splice(index, 1)
                data = JSON.stringify(players)
                fs.writeFileSync('Players.json', data)
            }
        })

        
    }
    else{
        res.status(400).json({ msg: `No Player with the id ${req.params.id}`});
    }


})
    module.exports = router;