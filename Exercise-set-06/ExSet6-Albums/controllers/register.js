const User = require('../models/User')
const bcrypt = require('bcryptjs')
const APIError = require('../errors/apierror')
const { StatusCodes } = require('http-status-codes')

const createUser = async (req,res) => {
  const { username, name, password } = req.body
  const userExists = await User.findOne({ username })
  if (userExists) {
    return res.status(StatusCodes.CONFLICT).send({ success : false, msg:`User already exists: ${username}`})
  }
  if (!username || !name || !password){
    return res.status(StatusCodes.NOT_ACCEPTABLE).send({ success: false, msg: "All fields required!"})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash,
  })

  await user.save()
  res.status(StatusCodes.CREATED).json({ user })
}


module.exports = {
  createUser
}