import express from 'express'
import { authorize } from '../middlewares/roleMiddleware.js'
import { deleteProfile, getProfile, updateProfile } from '../controllers/userController.js'


const router = express.Router()

router.use(authorize('seller', 'admin'))

router.get('/profile', getProfile)

router.patch('/profile', updateProfile)

router.delete('/profile', deleteProfile)


export default router