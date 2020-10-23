import User from '../Database/models/userModel.js'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../utils/generateToken.js'
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  const { _id, name, isAdmin } = user
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})


const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    const { _id, name, isAdmin, email } = user
    res.status(200).json({
      _id,
      name,
      email,
      isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User already exist')
  }
  const user = await User.create({ email, password, name })
  const { _id, isAdmin } = user
  if (user) {
    res.status(201).json({
      _id,
      name,
      email,
      isAdmin, 
      token: generateToken(_id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})



export {
  authUser,
  getUserProfile,
  registerUser
}