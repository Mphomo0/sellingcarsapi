const express = require('express')
const router = express.Router()
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')

// Log in a user
router.post('/login', authUser)

// Register a new user
router.route('/').post(registerUser)

// Log out the user
router.post('/logout', logoutUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route('/').get(protect, getUsers)

module.exports = router
