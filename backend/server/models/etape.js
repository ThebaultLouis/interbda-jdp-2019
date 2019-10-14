var mongoose = require('mongoose')


var EtapeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
  },
  adresse: {
    type: String
  },
  indexParcours: {
    type: Number
  },
  // prochaineEtape: {
  //   type: mongoose.Schema.Types.ObjectId,
  // },
  parcours: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parcours'
  }
})

var Etape = mongoose.model('Etape', EtapeSchema)
module.exports = {
  Etape
}