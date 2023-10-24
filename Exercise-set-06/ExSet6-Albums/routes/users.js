const express = require('express')
const router = express.Router()
const {
  getUsers,
  getSingleUser,
} = require('../controllers/users')
router.get('/', getUsers)
router.get('/:id', getSingleUser)
module.exports = router