const express = require('express')
const router = express.Router()
const findVehicle = require('../middleware/findVehicle')

const {
  getVehicles,
  createVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehicles')

// Router level middleware
// router.use(findVehicle)

router.get('/', getVehicles)
router.post('/', createVehicle)
router.get('/:id', findVehicle, getSingleVehicle)
router.put('/:id', findVehicle, updateVehicle)
router.delete('/:id', findVehicle, deleteVehicle)

module.exports = router
