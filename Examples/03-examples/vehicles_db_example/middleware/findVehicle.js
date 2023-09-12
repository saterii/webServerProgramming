const Vehicle = require('../models/Vehicle')

const findVehicle = async (req, res, next) => {
  const { id } = req.params
  try {
    const vehicle = await Vehicle.findById(id)
    if (!vehicle) {
      return res
      .status(404)
      .json({ success: false, msg: `No vehicle found with id ${id}` })
    }
    req.vehicle = vehicle
    console.log(req.vehicle)
    // Siirretään käsittely kontrollerille
    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = findVehicle