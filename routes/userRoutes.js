import express from 'express'
import { getProfile, updateProfile, deleteProfile } from '../controllers/userController.js'
import { authorize } from '../middlewares/roleMiddleware.js'


const router = express.Router()

router.use(authorize('user', 'admin'))

router.get('/profile', getProfile)

router.patch('/profile', updateProfile)

router.delete('/profile', deleteProfile)


export default router