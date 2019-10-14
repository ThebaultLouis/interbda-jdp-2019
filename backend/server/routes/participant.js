const express = require('express')
const router = express.Router()


var {
    Participant
} = require('./../models/participant')

router.get('/', (req, res) => {
    Participant.find({}).then(participants => {
        res.send({
            participants
        })
    })
})

module.exports = router