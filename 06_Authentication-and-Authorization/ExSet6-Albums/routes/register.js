const express = require('express')
const router = express.Router()
const { createUser } = require('../controllers/register')
router.post('/', createUser)
module.exports = router