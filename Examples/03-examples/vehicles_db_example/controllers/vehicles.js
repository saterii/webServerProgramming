const Vehicle = require('../models/Vehicle')

const getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({})
  res.status(200).json({ success: true, data: vehicles })
}

const createVehicle = async (req, res) => {
  const { make, model, type } = req.body
  if (!make || !model || !type) {
    return res
      .status(400)
      .json({ success: false, msg: 'Both fields required' })
  }
   try {
     const vehicle = await Vehicle.create({ make, model, type })
     return res.status(201).send({ success: true, data: vehicle })
   } catch (err) {
     res.status(400).send({ success: false, msg: err.message })
   }
  
}

const getSingleVehicle = async (req, res) => {
  return res.status(200).json({ success: true, data: req.vehicle })
}

const updateVehicle = async (req, res) => {
  const { type, make, model } = req.body
  req.vehicle.type = type
  try {
    await req.vehicle.save()
    res.status(200).send({success: true, data: req.vehicle})
    
  } catch (error) {
    res.status(400).send({ success: false, msg: err.message })
  }
}

const deleteVehicle = async (req, res) => {
  // await Vehicle.deleteOne({ _id: req.vehicle._id})
  try {
    await req.vehicle.remove()
    res.status(200).send({success: true})   
  } catch (error) {
    res.status(400).send({ success: false, msg: err.message })
  }
}

module.exports = {
  getVehicles,
  createVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle
}
