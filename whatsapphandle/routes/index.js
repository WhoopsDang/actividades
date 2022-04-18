const express = require('express')
const router = express.Router()
const {findAll, add, deleteById, checkDates, sendMessage} = require('../controllers/index')

//homepage
router.get('/', (req,res)=>{
    res.render('index',{
        title: "Welcome" 
    })
})

router.get('/check', checkDates)

router.get('/friends', findAll)


// router.get('/:birthday', control.findByDate)

router.post('/friends', add)
router.post('/birthday', sendMessage)
router.post('/:id', deleteById)





module.exports = router