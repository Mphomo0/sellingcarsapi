const path = require('path')
const express = require('express')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/') // Set the destination directory for uploaded files
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    ) // Define the filename for the uploaded file
  },
})

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/ // Define allowed file extensions
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/ // Define allowed image MIME types

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = mimetypes.test(file.mimetype)

  if (extname && mimetype) {
    cb(null, true) // Allow the file if it matches the defined extensions and MIME types
  } else {
    cb(new Error('Images only!'), false) // Reject the file if it doesn't match the criteria
  }
}

const upload = multer({ storage, fileFilter }) // Create a multer instance with defined storage and file filter
const uploadSingleImage = upload.single('image') // Specify that it's a single file upload with the field name 'image'

router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message }) // Handle errors if file upload fails
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`, // Send a success response with the uploaded image path
    })
  })
})

module.exports = router
