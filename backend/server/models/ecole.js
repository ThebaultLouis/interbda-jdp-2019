var mongoose = require('mongoose')


var EcoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  }
})

var Ecole = mongoose.model('Ecole', EcoleSchema)
module.exports = {
  Ecole
}
