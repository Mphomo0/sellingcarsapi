const mongoose = require('mongoose')

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1986,
      max: new Date().getFullYear(),
    },
    fuelType: {
      type: String,
      required: true,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    },
    transmission: {
      type: String,
      required: true,
      enum: ['Automatic', 'Manual'],
    },
    mileage: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imagesUrl: {
      type: [String],
    },
    tobeFeatured: {
      type: String,
      required: true,
      enum: ['Yes', 'No'],
    },
  },
  {
    timestamps: true, // created at and updated at
  }
)

const Car = mongoose.model('Car', carSchema)
module.exports = Car
