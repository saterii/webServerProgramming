const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
const albumSchema = new mongoose.Schema({
  artist: {
            type: String,
            required: true
          },
  title:  {
            type: String,
            required: true
          },
  year:   {
            type: Number,
            min: [1900, "Year must be a minimum of 1900."],
            max: [2023, "Can't add albums that are not out yet!"],
            required: true
          },
  genre: String,
  ownerId: ObjectId,
  tracks: {
            type: Number,
            min: [1, "Album must have at least one track!"],
          },
},
{ collection : "albums"})
  
const Album = mongoose.model('Album', albumSchema)

module.exports = Album