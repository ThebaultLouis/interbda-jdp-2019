const express = require('express')
const router = express.Router()
const {mongoose} = require('./../db/mongoose')
const _ = require('lodash')
const faker = require('faker')
const {ObjectID} = require('mongodb')

var {Danse} = require('./../models/danse')
var {authenticate} = require('./../middleware/authenticate')



router.post('/', (req, res) => {
  var body = _.pick(req.body, ['name', 'teachedAt', 'revisee', '_niveau', 'youtube', 'pdf', '_dansesRevisees', 'logo'])

  var niveau = new Danse({
    name: body.name,
    teachedAt: body.teachedAt,
    youtube: body.youtube,
    pdf: body.pdf,
    revisee: body.revisee,
    logo: body.logo,
    _niveau: body._niveau,
    _dansesRevisees: body._dansesRevisees
  })

  niveau.save().then(doc => {
    res.send(doc)
  }).catch(e => {
    res.status(400).send(e)}
  )
})

router.get('/', (req, res) => {
  Danse.find({}).then(danses => {
    res.send(danses)
  }).catch(e => res.status(400).send(e))
})

router.post('/:n', (req, res) => {

  n = Number(req.params.n)
  var url = `${process.env.URL}:${process.env.PORT}/api/danses`
  var numberToSkip = 3

  var body = _.pick(req.body, ['_niveau'])
  body.revisee = false

  Danse.countDocuments(body).then(total => {
    Danse.find(body, null, {sort: {teachedAt: -1},limit: numberToSkip, skip: (n - 1) * numberToSkip}).then(danses => {
      res.send({
        nextUrl: `${url}/${n + 1}`,
        previousUrl: n ? `${url}/${n - 1}`: null,
        totalPage: Math.ceil(total/numberToSkip),
        danses
      })
    })
  }).catch(e => res.status(400).send(e))
})

router.delete('/:id', (req, res) => {
  Danse.findByIdAndDelete(ObjectID(req.params.id)).then(danse => {
    if (!danse) {
      return res.status(404).send()
    }
    res.send(danse)
  }).catch(e => res.status(400).send(e))
})

router.patch('/:id', (req, res) => {
    var body = _.pick(req.body, ['name', 'teachedAt', 'revisee', '_niveau', 'youtube', 'pdf', '_dansesRevisees', 'logo'])

  Danse.findOneAndUpdate({_id: req.params.id}, {$set: body}, {new: true}).then(danse => {
    if (!danse) {
      return res.status(404).send()
    }
    res.send(danse)
  }).catch(e => res.status(400).send())
})

module.exports = router
