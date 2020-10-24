import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../Middlewares/authMiddleware.js'
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/register').post(registerUser)


export default router