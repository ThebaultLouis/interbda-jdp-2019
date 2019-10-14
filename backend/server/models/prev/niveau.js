var mongoose = require('mongoose')

var NiveauSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  jour: {
    type: String,
    required: true
  },
  heureDebut: {
    type: String,
    required: true
  },
  heureFin: {
    type: String,
    required: true
  },
  logo: {
    type: String
  },
  _dansesApprises: {
    type: Array,
    required: false
  }
})
var Niveau = mongoose.model('Niveau', NiveauSchema)
module.exports = {
  Niveau
}
