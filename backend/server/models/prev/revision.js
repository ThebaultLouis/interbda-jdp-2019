var mongoose = require('mongoose')


var RevisionSchema = new mongoose.Schema({
  doneAt: {
    type: Number,
    required: true
  },
  niveaux: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  logos: {
    type: Array,
    required: false,
    _id: {
      type: mongoose.Schema.Types.ObjectId
    },
    logo: {
      type: String
    }
  }
})

var Revision = mongoose.model('Revision', RevisionSchema)
module.exports = {
  Revision
}
