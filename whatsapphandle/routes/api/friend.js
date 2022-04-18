const express = require('express')
const router = express.Router()
const control = require('../../controllers/friend')

router.get('/',  control.findAll)

router.get('/:birthday', control.findByDate)

router.post('/', control.add)

router.post('/:date', control.checkDates)

router.delete('/:id', control.deleteById)


module.exports = router