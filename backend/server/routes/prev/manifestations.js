const express = require('express')
const {mongoose} = require('./../db/mongoose')
const _ = require('lodash')
const faker = require('faker')
const {ObjectID} = require('mongodb')

var {Manifestation} = require('./../models/manifestation')
var {authenticate} = require('./../middleware/authenticate')

const router = express.Router()

router.post('/', (req, res) => {
  var body = _.pick(req.body, ['name', 'doneAt', 'domicile', 'city', 'zipcode', 'club', 'description', 'pdf'])

  var manifestation = new Manifestation({
    name: body.name,
    doneAt: body.doneAt,
    domicile: body.domicile,
    city: body.city,
    zipcode: body.zipcode,
    club: body.club,
    description: body.description,
    pdf: body.pdf
  })

  manifestation.save().then(manifestation => {
    res.send(manifestation)
  }).catch(e => {
    res.status(400).send(e)}
  )
})

router.get('/', (req, res) => {
  Manifestation.find({}).then(manifestations => {
    res.send(manifestations)
  }).catch(e => res.status(400).send(e))
})

router.post('/:n', (req, res) => {

  n = Number(req.params.n)
  var url = `${process.env.URL}:${process.env.PORT}/api/manifestations`
  var numberToSkip = 3

  var body = _.pick(req.body, ['domicile'])

  Manifestation.countDocuments(body).then(total => {
    Manifestation.find(body, null, {validUntil: {$gte: new Date()}, sort: {doneAt: 1}, limit: numberToSkip, skip: (n - 1) * numberToSkip}).then(manifestations => {

      res.send({
        nextUrl: `${url}/${n + 1}`,
        previous: n - 1 ? `${url}/${n - 1}`: null,
        total,
        totalPage: Math.ceil(total / numberToSkip),
        manifestations
      })
    })
  }).catch(e => res.status(400).send(e))
})

router.delete('/:id', (req, res) => {
  Manifestation.findByIdAndDelete(ObjectID(req.params.id)).then(manifestation => {
    if (!manifestation) {
      return res.status(404).send()
    }
    res.send(manifestation)
  }).catch(e => res.status(400).send(e))
})

router.patch('/:id', (req, res) => {
  var body = _.pick(req.body, ['name', 'doneAt', 'domicile', 'city', 'zipcode', 'club', 'description', 'pdf'])

  Manifestation.findOneAndUpdate({_id: req.params.id}, {$set: body}, {new: true}).then(manifestation => {
    if (!manifestation) {
      return res.status(404).send()
    }
    res.send(manifestation)
  }).catch(e => res.status(400).send())
})

module.exports = router
