const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
  type: String,
  make: String,
  model: String,
})

module.exports = mongoose.model('Vehicle', vehicleSchema)
