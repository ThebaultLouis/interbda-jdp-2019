const express = require('express')
const router = express.Router()
const {mongoose} = require('./../db/mongoose')
const _ = require('lodash')
const faker = require('faker')
const {ObjectID} = require('mongodb')

// var {Parcours} = require('./../models/parcours')
var {Etape} = require('./../models/etape')

router.get('/', (req, res) => {
  Etape.find({}).then(etapes => {
    res.send({etapes})
  })
})

router.get('/:id', (req, res) => {
  // var body = _.pick(req.body, ['name', 'jour', 'logo', 'heureDebut', 'heureFin'])

  Etape.findOne({_id: req.params.id}).then((etape) => {
    if (!etape) {
      return res.status(404).send()
    }
    res.send(etape)
  }).catch(e => res.status(400).send())
})

module.exports = router
