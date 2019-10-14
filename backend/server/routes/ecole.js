const express = require('express')
const router = express.Router()
const {mongoose} = require('./../db/mongoose')
const _ = require('lodash')
const faker = require('faker')
const {ObjectID} = require('mongodb')


var {Ecole} = require('./../models/ecole')

router.get('/', (req, res) => {
  Ecole.find({}).then(ecoles => {
    res.send({ecoles})
  })
})
router.get('/name', (req, res) => {
  // var body = _.pick(req.body, ['name', 'jour', 'logo', 'heureDebut', 'heureFin'])

  Ecole.findOne({name: req.query.name}).then((ecole) => {
    if (!ecole) {
      return res.send({err: "Cette équipe n'existe pas."})
    }
    res.send(ecole)
  }).catch(e => res.status(400).send())
})

router.get('/:id', (req, res) => {
  // var body = _.pick(req.body, ['name', 'jour', 'logo', 'heureDebut', 'heureFin'])

  Ecole.findOne({_id: req.params.id}).then((ecole) => {
    if (!ecole) {
      return res.status(404).send()
    }
    res.send(ecole)
  }).catch(e => res.status(400).send())
})

module.exports = router
