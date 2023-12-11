const express = require('express')
const authMiddleware = require('../middleware/auth')
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
router.post('/', createAlbum)
router.put('/:id', authMiddleware, updateAlbum)
router.delete('/:id', deleteAlbum)

module.exports = router