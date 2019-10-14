const express = require('express')
const router = express.Router()
const {
  mongoose
} = require('./../db/mongoose')
const _ = require('lodash')
const faker = require('faker')
const {
  ObjectID
} = require('mongodb')


var {
  Equipe
} = require('./../models/equipe')
var {
  Participant
} = require('./../models/participant')

router.get('/', (req, res) => {
  Equipe.find({}).populate('').then(equipes => {
    res.send({
      equipes
    })
  })
})
router.get('/classement', (req, res) => {
  Equipe.find({
    'parcoursTermine': true
  }).sort({
    'tempsTotal': -1
  }).then(equipes => {
    res.send({
      equipes
    })
  })
})
router.get('/name', (req, res) => {
  // var body = _.pick(req.body, ['name', 'jour', 'logo', 'heureDebut', 'heureFin'])

  Equipe.findOne({
    name: req.query.name
  }).then((equipe) => {
    if (!equipe) {
      return res.send({
        err: "Cette équipe n'existe pas."
      })
    }
    res.send(equipe)
  }).catch(e => res.status(400).send())
})

router.get('/:id', (req, res) => {
  // var body = _.pick(req.body, ['name', 'jour', 'logo', 'heureDebut', 'heureFin'])

  Equipe.findOne({
    _id: req.params.id
  }).then((equipe) => {
    if (!equipe) {
      return res.status(404).send()
    }
    res.send(equipe)
  }).catch(e => res.status(400).send())
})

router.post('/', (req, res) => {
  var body = _.pick(req.body, ['name', '_participants', '_parcours'])
  // res.send(body)

  Participant.insertMany(body._participants).then(participants => {

    Equipe.create(body).then(equipe => {
      // equipe._participants.forEach(participant => {
      //   participant._equipe = equipe._id
      //   participant.save()
      // })
      res.status(200).send(equipe)
    })

  }).catch(e => res.status(400).send())
})
router.patch('/:id', (req, res) => {
  // var body = _.pick(req.body, ['etapeValidee'])
  Equipe.findOne({
    _id: req.params.id
  }).then((equipe) => {
    if (!equipe) {
      return res.status(404).send()
    }
    // var indexEtape = req.query.indexEtape
    // if (!equipe.etapesRealisees.length) {
    //   equipe.debutParcours = Date.now()
    // }
    // equipe.etapesRealisees.push({
    //   _id: body.etapeValidee,
    //   doneAt: Date.now()
    // })
    equipe.etapesRealisees += 1
    equipe.tempsRealises.push(Date.now())
    if (equipe.etapesRealisees == equipe._parcours.etapes.length) {
      equipe.parcoursTermine = Boolean(1)
    }
    equipe.save()
    res.send(equipe)

  }).catch(e => res.status(400).send())
})
router.patch('/skip/:id', (req, res) => {
  // var body = _.pick(req.body, ['etapeValidee'])
  Equipe.findOne({
    _id: req.params.id
  }).then((equipe) => {
    if (!equipe) {
      return res.status(404).send()
    }
    equipe.etapesPassees.push(equipe.etapesRealisees)
    equipe.etapesRealisees += 1
    equipe.tempsRealises.push(Date.now())
    if (equipe.etapesRealisees == equipe._parcours.etapes.length) {
      equipe.parcoursTermine = Boolean(1)
    }
    equipe.save()
    res.send(equipe)

  }).catch(e => res.status(400).send())
})

module.exports = router