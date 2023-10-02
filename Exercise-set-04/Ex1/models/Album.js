const mongoose = require("mongoose")
const albumSchema = new mongoose.Schema({
  artist: String,
  title: String,
  year: Number,
  genre: String,
  tracks: Number,
},
{ collection : "albums"})
  
const Album = mongoose.model('Album', albumSchema)

module.exports = Album