var mongoose = require('mongoose')


var ParticipantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  ecole: {
    // type: String
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ecole'
  },
  _equipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipe'
  }
})

var Participant = mongoose.model('Participant', ParticipantSchema)
module.exports = {
  Participant
}