require('./config/config')
require('./seed/seed.js')
// require('./createAdmin')

var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var _ = require('lodash')


var app = express()
app.use(cors())
app.use(bodyParser.json())


// Parcours
const parcours = require('./routes/parcours')

app.use('/api/parcours', parcours)
// Etape
const etape = require('./routes/etape')

app.use('/api/etape', etape)

// Equipe
const equipe = require('./routes/equipe')

app.use('/api/equipe', equipe)
// Equipe
const participant = require('./routes/participant')

app.use('/api/participant', participant)

// Ecole
const ecole = require('./routes/ecole')

app.use('/api/ecole', ecole)


// // TempsLimite
// const tempsLimite = require('./routes/tempsLimite')
//
// app.use('/api/tempsLimite', tempsLimite)


// // Participant
// const participant = require('./routes/participant')
//
// app.use('/api/participant', participant)
//
// // TempsEpreuve
// const tempsEpreuve = require('./routes/tempsEpreuve')
//
// app.use('/api/tempsEpreuve', tempsEpreuve)



app.listen(process.env.PORT, () => {
  console.log(`Started in port ${process.env.PORT}`)
})

module.exports.app = app

// // Niveau
// const niveaux = require('./routes/niveaux')
//
// app.use('/api/niveaux', niveaux)
//
// // Niveau
// const niveaux = require('./routes/niveaux')
//
// app.use('/api/niveaux', niveaux)
//
// // Manifestation
// const manifestations = require('./routes/manifestations')
//
// app.use('/api/manifestations', manifestations)
//
// // Danse
// const danses = require('./routes/danses')
//
// app.use('/api/danses', danses)
//
// // Revision
// const revisions = require('./routes/revisions')
//
// app.use('/api/revisions', revisions)
//
// // Admin
// const admin = require('./routes/admin')
//
// app.use('/api/admin', admin)