import express from 'express'
import { authUser, registerUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


const userRoutes=express.Router()

userRoutes.post('/login',authUser)
userRoutes.route('/profile').get(protect, getUserProfile)
userRoutes.route('/').post(registerUser)


export default userRoutes