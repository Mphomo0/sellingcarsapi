// Middleware to handle "Not Found" errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// Middleware to handle errors and send appropriate responses
const errorHandler = (err, req, res, next) => {
  // Determine the status code based on the response status
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  // Send a JSON response with error details
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = { notFound, errorHandler }
