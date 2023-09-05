const express = require('express')
const router = express.Router()


const {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} = require('../controllers/albums.js')

router.get('/', getAlbums)
router.post('/', createAlbum)
router.put('/:id', updateAlbum)
router.delete('/:id', deleteAlbum)

module.exports = router