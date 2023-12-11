const express = require('express')
const router = express.Router()
const findUser = require('../middleware/findUser')

const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require('../controllers/users')


router.get('/', getUsers)
router.post('/', createUser)
router.get('/:id', findUser, getSingleUser)
router.put('/:id', findUser, updateUser)
router.delete('/:id', findUser, deleteUser)

module.exports = router