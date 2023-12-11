const User = require('../models/User')
const bcrypt = require('bcryptjs')
const APIError = require('../errors/apierror')
const { StatusCodes } = require('http-status-codes')

const getUsers = async (req,res) => {
  const users = await User.find({}).select('name albums').populate('albums', {artist:1, title:1})
  res.status(StatusCodes.OK).json({ users })
}

const createUser = async (req,res) => {
  const { username, name, password, email } = req.body
  const userExists = await User.findOne({ username })
  if (userExists) {
    return res.status(StatusCodes.CONFLICT).send({ success : false, msg:`User already exists: ${username}`})
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

const getSingleUser = async (req,res) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (!user) {
    // replace with NotFound error
    return res.status(StatusCodes.NOT_FOUND).send({success: false, msg: 'No such user'})
  }
  res.status(StatusCodes.OK).json({ user })
}

module.exports = {
  getUsers,
  createUser,
  getSingleUser
}
