const express = require('express')
const {mongoose} = require('./../db/mongoose')
const _ = require('lodash')
const faker = require('faker')
const {ObjectID} = require('mongodb')

var {Niveau} = require('./../models/niveau')
var {authenticate} = require('./../middleware/authenticate')

const router = express.Router()

router.post('/', (req, res) => {

  var body = _.pick(req.body, ['name', 'jour', 'logo', 'heureDebut', 'heureFin'])

  var niveau = new Niveau({
    name: body.name,
    jour: body.jour,
    logo: body.logo,
    heureDebut: body.heureDebut,
    heureFin: body.heureFin

  })
  niveau.save().then(doc => {
    res.send(doc)
  }).catch(e => {
    res.status(400).send(e)}
  )

})
router.get('/', (req, res) => {
  Niveau.find({}).sort({heureDebut: 1}).then(niveaux => {
    res.send({niveaux})
  })
})
router.delete('/:id', (req, res) => {
  Niveau.findByIdAndDelete(req.params.id).then((niveau) => {
    if (!niveau) {
      return res.status(404).send()
    }
    res.send(niveau)
  }).catch(e => res.status(400).send())
})

router.patch('/:id', (req, res) => {
  var body = _.pick(req.body, ['name', 'jour', 'logo', 'heureDebut', 'heureFin'])

  Niveau.findOneAndUpdate({_id: req.params.id}, {$set: body}, {new: true}).then((niveau) => {
    if (!niveau) {
      return res.status(404).send()
    }
    res.send(niveau)
  }).catch(e => res.status(400).send())
})

module.exports = router
