const multer = require('multer')
const path = require('path')

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const uploadArray = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 6 }, // 6MB file size limit
}).array('images', 6) // Expecting the 'images' field

module.exports = uploadArray
