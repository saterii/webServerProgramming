const {User, Vehicle} = require('../models/index')
const { StatusCodes } = require('http-status-codes')

const getVehicles = async (req, res) => {
  const vehicles = await Vehicle.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.status(StatusCodes.OK).json({ success: true, data: vehicles })
}

const createVehicle = async (req, res) => {
  const { user } = req.query
  if ( !Number(user) ) {
    return res.status(StatusCodes.BAD_REQUEST).json({success: false, msg: 'No userId or bad userId provided'})
  }
  const checkUser = await User.findByPk(Number(user))
  if (!checkUser) {
    return res.status(StatusCodes.NOT_FOUND).json({success: false, msg: 'User not found'})
  }
  const { make, model, license_plate, commissioned } = req.body
  const type = Math.round(Math.random()) > 0 ? 'Van' : 'Passenger car'
  console.log(user)
  const vehicle = await Vehicle.create({make, model, type, license_plate, commissioned, user_id: user})
  return res.status(StatusCodes.CREATED).send({ success: true, data: vehicle })  
}

const getSingleVehicle = async (req, res) => {
  return res.status(StatusCodes.OK).json({ success: true, data: req.vehicle })   
}

const updateVehicle = async (req, res) => {
  req.vehicle.commissioned = !req.vehicle.commissioned
  await req.vehicle.save()
  res.status(StatusCodes.OK).json({ success: true, data: req.vehicle })   
}

const deleteVehicle = async (req, res) => {
  await req.vehicle.destroy()
  return res.status(StatusCodes.OK).json({ success: true })
}

module.exports = {
  getVehicles,
  createVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle
}
