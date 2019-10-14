var mongoose = require('mongoose')


var EquipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true

  },
  etapesRealisees: {
    type: Number,
    default: 0
  },
  etapesPassees: {
    type: Array,
    default: []
  },
  tempsRealises: {
    type: Array,
    default: []
  },
  // etapesRealisees: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: [],
  //   ref: 'Etape'
  // }],
  // debutParcours: {
  //   type: Number
  // },
  // finParcours: {
  //   type: Number
  // },
  parcoursTermine: {
    type: Boolean,
    default: false
  },
  _parcours: {
    type: mongoose.Schema.Types.Mixed,
  },
  // _parcours: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Parcours'
  // },
  _participants: [{
    type: mongoose.Schema.Types.Mixed
  }]
  // participants: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Participant'
  // }]
})

var Equipe = mongoose.model('Equipe', EquipeSchema)
module.exports = {
  Equipe
}