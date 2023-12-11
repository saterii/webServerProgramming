const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const findUser = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id)
  if (!req.user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, msg: `No user found with id ${req.params.id}` })
  }
  next()   
}

module.exports = findUser