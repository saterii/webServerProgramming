const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth")
const {
  getAlbum,
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} = require('../controllers/albums')

router.get("/:id", getAlbum)
router.get('/', auth, getAlbums)
router.post('/', createAlbum)
router.put('/:id', updateAlbum)
router.delete('/:id', deleteAlbum)

module.exports = router