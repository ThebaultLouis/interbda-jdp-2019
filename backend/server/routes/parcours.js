const express = require('express')
const router = express.Router()
const {mongoose} = require('./../db/mongoose')
const _ = require('lodash')
const faker = require('faker')
const {ObjectID} = require('mongodb')

var {Parcours} = require('./../models/parcours')
// var {Etape} = require('./../models/etape')

router.get('/', (req, res) => {
  Parcours.find({}).then(parcours => {
    res.send({parcours})
  })
})
router.get('/:id', (req, res) => {
  // var body = _.pick(req.body, ['name', 'jour', 'logo', 'heureDebut', 'heureFin'])

  Parcours.findOne({_id: req.params.id}).then((parcours) => {
    if (!parcours) {
      return res.status(404).send()
    }
    res.send(parcours)
  }).catch(e => res.status(400).send())
})



module.exports = router
