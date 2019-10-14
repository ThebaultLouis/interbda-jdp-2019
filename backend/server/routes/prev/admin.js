const express = require('express')
const router = express.Router()
const {mongoose} = require('./../db/mongoose')
const _ = require('lodash')
const {ObjectID} = require('mongodb')

var {User} = require('./../models/user')
var {authenticate} = require('./../middleware/authenticate')

router.post('/login', (req, res) => {
  var body = _.pick(req.body, ['username', 'password'])

  User.findByCredentials(body.username, body.password).then(user => {
      res.status(200).header('x-auth', user.tokens[0].token).send(user)

  }).catch(e => {
    res.status(400).send(e)
  })
})

router.delete('/login', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }).catch(e => res.status(400).send())
})

module.exports = router
