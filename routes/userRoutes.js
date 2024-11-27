import express from 'express'
import { getAllPlacedOrders, placeOrder, cancelOrder } from '../controllers/orderController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/orders', getAllPlacedOrders)

router.post('/order', placeOrder)

router.delete('/order/:orderId', cancelOrder)


export default router