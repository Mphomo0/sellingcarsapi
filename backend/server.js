const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/connectDB')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const carRoutes = require('./routes/carRoutes')
const userRoutes = require('./routes/userRoutes')
const uploadArray = require('./middlewares/uploadArray')

dotenv.config()
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({}))

// Handle image uploads
app.post('/api/upload', uploadArray, (req, res) => {
  const imagePaths = req.files.map((file) => file.path)
  res.json({ imagePaths })
})

// Car routes
app.use('/api/cars', carRoutes)
app.use('/api/users', userRoutes)

// Static folder for serving uploaded images
app.use('/uploads', express.static('./uploads'))

// Custom error handlers
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
