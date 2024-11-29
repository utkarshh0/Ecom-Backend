import express from 'express'
import { authorize } from '../middlewares/roleMiddleware.js'
import { getAllSellers, getAllUsers } from '../controllers/userController.js'

const router = express.Router()

router.use(authorize('admin'))

router.get('/sellers', getAllSellers)

router.get('/users', getAllUsers)

export default router