const express = require('express')
const router = express.Router()
const {mongoose} = require('./../db/mongoose')
const _ = require('lodash')
const faker = require('faker')
const {ObjectID} = require('mongodb')

var {Revision} = require('./../models/revision')
var {authenticate} = require('./../middleware/authenticate')



router.post('/', (req, res) => {
  var body = _.pick(req.body, ['doneAt', 'niveaux', 'description', 'logos'])

  var revision = new Revision({
    doneAt: body.doneAt,
    niveaux:body.niveaux,
    description: body.description,
    logos: body.logos
  })

  revision.save().then(doc => {
    res.send(doc)
  }).catch(e => {
    res.status(400).send(e)}
  )
})

router.get('/', (req, res) => {
  Revision.find({}).then(revisions => {
    res.send(revisions)
  }).catch(e => res.status(400).send(e))
})

router.post('/:n', (req, res) => {

  n = Number(req.params.n)
  var url = `${process.env.URL}:${process.env.PORT}/api/revisions`
  var numberToSkip = 6

  var body = _.pick(req.body, ['niveaux'])

  var requete = body.niveaux ? {niveaux: {$in: body.niveaux.map(niveau => ObjectID(niveau))}} : {}

  Revision.countDocuments(requete).then(total => {
    Revision.find(requete, null, {validUntil: {$gte: new Date()}, sort: {doneAt: 1}, limit: numberToSkip, skip: (n - 1) * numberToSkip}).
    then(revisions => {
      res.send({
        nextUrl: `${url}/${n + 1}`,
        previousUrl: n ? `${url}/${n - 1}`: null,
        totalPage: Math.ceil(total/numberToSkip),
        revisions
      })
    })
  }).catch(e => res.status(400).send(e))
})

router.delete('/:id', (req, res) => {
  Revision.findByIdAndDelete(req.params.id).then(Revision => {
    if (!Revision) {
      return res.status(404).send()
    }
    res.send(Revision)
  }).catch(e => res.status(400).send(e))
})

router.patch('/:id', (req, res) => {
  var body = _.pick(req.body, ['doneAt', 'niveaux', 'description', 'logos'])

  Revision.findOneAndUpdate({_id: req.params.id}, {$set: body}, {new: true}).then(Revision => {
    if (!Revision) {
      return res.status(404).send()
    }
    res.send(Revision)
  }).catch(e => res.status(400).send())
})

module.exports = router
