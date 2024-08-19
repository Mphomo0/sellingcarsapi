const Car = require('../models/carModel')
const asyncHandler = require('express-async-handler')
const upload = require('../middlewares/uploadArray')

// @desc    Get cars
// @route   GET /api/cars
// @access  Public
const getCars = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1
  const limit = 8
  const skip = (page - 1) * limit

  const count = await Car.countDocuments({})
  const cars = await Car.find({}).skip(skip).limit(limit)

  res.json({
    cars,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  })
})

// @desc    Get car
// @route   GET /api/cars/:id
// @access  Public
const getCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id)

  if (car) {
    res.json(car)
  } else {
    res.status(404)
    throw new Error('Car not found')
  }
})

// @desc    Create car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = asyncHandler(async (req, res) => {
  const {
    name,
    make,
    model,
    year,
    fuelType,
    transmission,
    mileage,
    price,
    description,
    tobeFeatured,
  } = req.body

  // Create a new car object
  const car = {
    name,
    make,
    model,
    year,
    fuelType,
    transmission,
    mileage,
    price,
    description,
    tobeFeatured,
    imagesUrl: req.body.images || [],
  }

  // Save the car to the database
  const newCar = await Car.create(car)
  res.status(201).json(newCar)
})

// @desc    Update car
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = asyncHandler(async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      res.status(400)
      throw new Error(err)
    } else {
      const {
        name,
        make,
        model,
        year,
        fuelType,
        transmission,
        mileage,
        price,
        description,
        tobeFeatured,
      } = req.body

      const car = await Car.findById(req.params.id)

      if (car) {
        car.name = name || car.name
        car.make = make || car.make
        car.model = model || car.model
        car.year = year || car.year
        car.fuelType = fuelType || car.fuelType
        car.transmission = transmission || car.transmission
        car.mileage = mileage || car.mileage
        car.price = price || car.price
        car.description = description || car.description
        car.tobeFeatured = tobeFeatured || car.tobeFeatured

        // Process the uploaded images
        if (req.files && req.files.length > 0) {
          const imagePaths = req.files.map((file) => file.path)
          car.image = imagePaths
        }

        const updatedCar = await car.save()
        res.json(updatedCar)
      } else {
        res.status(404)
        throw new Error('Car not found')
      }
    }
  })
})

// @desc    Delete car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id)

  if (car) {
    await car.deleteOne({ _id: car._id })
    res.json({ message: 'Car removed' })
  } else {
    res.status(404)
    throw new Error('Car not found')
  }
})

// @desc    Get featured cars
// @route   GET /api/cars/featured
// @access  Public
const getFeatured = asyncHandler(async (req, res) => {
  const cars = await Car.find({ tobeFeatured: 'Yes' })
  res.json(cars)
})

// @desc    Search cars
// @route   GET /api/cars/search
// @access  Public
const searchCars = asyncHandler(async (req, res) => {
  const { make, model, year, price } = req.query
  const query = {}

  if (make) {
    query.make = make
  }

  if (model) {
    query.model = model
  }

  if (year) {
    query.year = year
  }

  if (price) {
    query.price = price
  }

  const cars = await Car.find(query)
  res.json(cars)
})

// @desc    Get make
// @route   GET /api/cars/make
// @access  Public
const getMakes = asyncHandler(async (req, res) => {
  try {
    const makes = await Car.find().distinct('make')
    if (!makes) {
      return res.status(404).json({ message: 'No makes found' })
    }
    res.json(makes)
  } catch (error) {
    console.error('Error fetching makes:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @desc    Get model
// @route   GET /api/cars/model
// @access  Public
const getModels = asyncHandler(async (req, res) => {
  const { make } = req.query
  const models = await Car.distinct('model', { make })
  res.json(models)
})

// @desc    Get year
// @route   GET /api/cars/year
// @access  Public
const getYears = asyncHandler(async (req, res) => {
  const { make, model } = req.query
  const years = await Car.distinct('year', { make, model })
  res.json(years)
})

// @desc    Get price
// @route   GET /api/cars/price
// @access  Public
const getPrices = asyncHandler(async (req, res) => {
  const { make, model, year } = req.query
  const prices = await Car.distinct('price', { make, model, year })
  res.json(prices)
})

module.exports = {
  getFeatured,
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
  searchCars,
  getMakes,
  getModels,
  getYears,
  getPrices,
}
