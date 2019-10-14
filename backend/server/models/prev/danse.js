var mongoose = require('mongoose')


var DanseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teachedAt: {
    type: Number,
    required: true
  },
  youtube: {
    type: String,
    required: false
  },
  pdf: {
    type: String,
    required: false
  },
  revisee: {
    type: Boolean,
    required: false
  },
  logo: {
    type: String
  },
  _dansesRevisees: {
    type: Array,
    required: false
  },

  _niveau: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }
})

var Danse = mongoose.model('Danse', DanseSchema)
module.exports = {
  Danse
}
