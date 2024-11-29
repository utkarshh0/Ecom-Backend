import express from 'express'
import { cancelOrder, getAllPlacedOrders, getAllPlacedOrdersByUser, placeOrder } from '../controllers/orderController.js'
import { authorize } from '../middlewares/roleMiddleware.js'

const router = express.Router()


router.post('/', authorize('user'), placeOrder)

router.get('/all', authorize('admin'), getAllPlacedOrders)

router.use(authorize('user', 'admin'))

router.get('/', getAllPlacedOrdersByUser)

router.delete('/', cancelOrder)


export default router