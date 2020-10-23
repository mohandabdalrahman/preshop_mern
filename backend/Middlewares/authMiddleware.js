import jwt from 'jsonwebtoken'
import User from '../Database/models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const { userId } = jwt.verify(token, process.env.SECRET_KEY)
      req.user = await User.findById(userId).select('-password')
    } catch (error) {
      console.log('protect -> error', error)
      res.status(401)
      throw new Error('No token')
    }
  } else {
    res.status(401)
    throw new Error('No token')
  }
  next()
})

export {
  protect
}