var mongoose = require('mongoose')


var ParcoursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // etapeInitiale: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Etape'
  // },
  etapes: [{
    type: mongoose.Schema.Types.Mixed
  }],
  index: Number
  // etapes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Etape'
  // }]
})

var Parcours = mongoose.model('Parcours', ParcoursSchema)
module.exports = {
  Parcours
}