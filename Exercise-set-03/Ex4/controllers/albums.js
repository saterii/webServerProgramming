let { albums } = require("../db")
const Album = require('../models/Album')
const createAlbum = async (req, res)=>{
  try {
    const album = await Album.create(req.body)
    res.status(201).json({ album })
  } catch (error) {
    res.status(500).json({ msg:error })
  }
}

const deleteAlbum = (req, res) => {
    
}

const updateAlbum = (req, res)=>{
    
}


const getAlbum = async (req, res) => {
  const { id } = req.params
  try {
    const albums = await Album.find({"id": id})
    res.status(200).json({ albums })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}


const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find({})
    res.status(200).json({ albums })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
    createAlbum,
    deleteAlbum,
    updateAlbum,
    getAlbums,
    getAlbum
}