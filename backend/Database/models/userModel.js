import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const { Schema, model } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    required: true,
    default: false
  }
}, {
  timestamps: true
})
// check password 
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
// encrypt password before save user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = model('User', userSchema)
export default User 