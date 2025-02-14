const Album = require('../models/Album')
const {APIError, CustomError} = require('../errors')
const { StatusCodes } = require('http-status-codes')

const createAlbum = async (req, res)=>{
  try {
    const album = await Album.create(req.body)
    res.status(201).json({ album })
    if(err){
      throw new CustomError("Wrong username or password!", StatusCodes.FORBIDDEN) 
    }
  } catch(err){next(err)}
}

const deleteAlbum = async (req, res) => {
  const { id } = req.params
  try{
    const album = await Album.findById(id)
    if (!album){
      return res.status(404).json({success: false, msg: `No album found with id ${id}`})
    }
    await Album.findByIdAndRemove(id)
    res.status(200).json({success: true})
  }catch(err){
    res.status(500).send({success: false, msg: err.message})
  }
}

const updateAlbum = async (req, res)=>{
  const { id } = req.params
  const { artist, title, year, genre, tracks} = req.body
  try{
    const album = await Album.findById(id)
    if (!album){
      return res.status(404).json({success: false, msg: `No album found with id ${id}`})
    }
    if(artist){album.artist = artist}
    if(title){album.title = title}
    if(year){album.year = year}
    if(genre){album.genre = genre}
    if(tracks){album.tracks = tracks}
    const updatedAlbum = await album.save()
    return res.status(200).json({success: true, data: updatedAlbum})
  }catch (error){
    if (error.name === "ValidationError"){
      let errors = {}
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message
      })
      return res.status(400).send(errors)
    }
    res.status(500).send({success: false, msg: error.message})
  }
}


const getAlbum = async (req, res) => {
  const { id } = req.params
  try {
    const album = await Album.findById(id)
    if (!album) {
      return res
        .status(404).json({ success: false, msg: `No album found with id ${id}` })
    }
    return res.status(200).json({ success: true, data: album })
  } catch (err) {
    res.status(500).send({success: false, msg: err.message})
  }
}



const getAlbums = async (req, res) => {
  
  const { sort, year, fields, artist, title } = req.query
  const queryObject = {}
  
  if(artist){
    queryObject.artist = { $regex: artist, $options: "i" }
  }
  if(title){
    queryObject.title = { $regex: title, $options: "i" }
  }

  if(year){queryObject.year = year}
  let result = Album.find(queryObject)

  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }
  if (fields){
    const filters = fields.split(",")
    result = result.select(filters)
  }
  const albums = await result
  res.status(200).json({ albums, nbHits: albums.length })

}





module.exports = {
  createAlbum,
  deleteAlbum,
  updateAlbum,
  getAlbums,
  getAlbum
}