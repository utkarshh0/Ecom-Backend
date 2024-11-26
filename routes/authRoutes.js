import express from 'express'
import { login, googleAuth, signup } from '../controllers/authController.js'

const router = express.Router()


router.post('/login', login)

router.post('/google', googleAuth)

router.post('/signup', signup)

export default router