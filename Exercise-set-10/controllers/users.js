const {User, Vehicle} = require('../models/index')

const { StatusCodes } = require('http-status-codes')

const getUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: {exclude : ['username']},
    include: {
      model: Vehicle,
      attributes: {exclude: ['userId']}
    }
  })
  res.status(StatusCodes.OK).json({ success: true, data: users })
}

const createUser = async (req, res) => {
  const { name, username } = req.body
  const user = await User.create({name, username})
  return res.status(StatusCodes.CREATED).send({ success: true, data: user })  
}

const getSingleUser = async (req, res) => {
  return res.status(StatusCodes.OK).json({ success: true, data: req.user })   
}

const updateUser = async (req, res) => {
  req.user.commissioned = !req.user.commissioned
  await req.user.save()
  res.status(StatusCodes.OK).json({ success: true, data: req.user })   
}

const deleteUser = async (req, res) => {
  await req.user.destroy()
  return res.status(StatusCodes.OK).json({ success: true })
}

module.exports = {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser
}
