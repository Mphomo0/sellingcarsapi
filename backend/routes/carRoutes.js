const express = require('express')
const {
  getCar,
  getCars,
  createCar,
  updateCar,
  deleteCar,
  getFeatured,
  searchCars,
  getMakes,
  getModels,
  getYears,
  getPrices,
} = require('../controllers/carController.js')
const { admin, protect } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/featured', getFeatured)
router.get('/search', searchCars)
router.get('/makes', getMakes)
router.get('/models', getModels)
router.get('/years', getYears)
router.get('/prices', getPrices)

//get all the cars or create a new car
router.route('/').get(getCars).post(protect, admin, createCar)

//get a single car, update a car or delete a car
router
  .route('/:id')
  .get(getCar)
  .put(protect, admin, updateCar)
  .delete(protect, admin, deleteCar)

module.exports = router
