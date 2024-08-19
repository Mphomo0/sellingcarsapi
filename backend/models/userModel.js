const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Middleware: Before saving the user, hash the password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next() // Skip hashing if the password hasn't been modified
  }

  const salt = await bcrypt.genSalt(10) // Generate a salt
  this.password = await bcrypt.hash(this.password, salt) // Hash the password
})

// Method: Compare the entered password with the stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User
