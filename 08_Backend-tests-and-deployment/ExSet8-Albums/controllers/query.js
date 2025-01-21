const Album = require('../models/Album')
const query = async (req, res) => {
  const { search } = req.query
  if (search) {
    const albums = await Album.find({$or: [
      {artist: {$regex: `${search}`}},
      {title: {$regex: `${search}`}},
      {year: {$regex: `${search}`}},
      {genre: {$regex: `${search}`}},
      {tracks: {$regex: `${search}`}}
    
    ]})
    if (albums.length < 1) {
      return res.status(200).json({ success: true, data: [] })
    }
    res.status(200).json({ success: true, data: albums })
  }
}
module.exports = { query }