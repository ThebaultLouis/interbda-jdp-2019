
const mongoose = require('mongoose')

const ManifestationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  doneAt: {
    type: Number,
    default: true
  },
  domicile: {
    type: Boolean,
    default: false,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  zipcode: {
    type: String,
    required: false
  },
  club: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  pdf: {
    type: String,
    required: false
  }
})

var Manifestation = mongoose.model('Manifestation', ManifestationSchema)

module.exports = {
  Manifestation
}
