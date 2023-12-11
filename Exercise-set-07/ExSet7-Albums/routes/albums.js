const express = require('express')
const authUser = require('../middleware/auth')
const router = express.Router()
const {
  getAlbum,
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} = require('../controllers/albums')

router.get("/:id", getAlbum)
router.get('/', getAlbums)
router.post('/', authUser, createAlbum)
router.put('/:id', authUser, updateAlbum)
router.delete('/:id', authUser, deleteAlbum)

module.exports = router