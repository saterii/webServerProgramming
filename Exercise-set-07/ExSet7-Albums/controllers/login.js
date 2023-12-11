const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { APIError, CustomError, UnauthorizedError } = require('../errors')
const { StatusCodes} = require('http-status-codes')

const login = async (req,res, next) => {
  try{
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwordCorrect)) {
      throw new UnauthorizedError("Wrong username or password!")
    }
    const userForToken = {
      username: user.username,
      id: user._id,
      role: user.role,
    }
    const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "7d"})
    res.status(StatusCodes.OK).send({ token, username: user.username })
}catch(error){next(error)}
}
module.exports = login