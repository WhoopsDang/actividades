const express = require('express');
const fs = require('fs')
const router = express.Router();
const PlayerController = require('../../controllers/player');




// Get all players
router.get('/', PlayerController.findAll);

    // Get single player
router.get('/:id', PlayerController.findById);
//router.get('/:team', PlayerController.findByTeam)

// Create new player
router.post('/', PlayerController.save);


// Update player
router.put('/:id', PlayerController.update);


router.delete('/:id', PlayerController.deleteById)

//router.delete('/:name', PlayerController.deleteByName)


module.exports = router;