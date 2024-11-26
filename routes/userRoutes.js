import express from 'express'
import { getAllPlacedOrders, placeOrder, cancelOrder } from '../controllers/orderController.js'

const router = express.Router()

router.get('/orders/:userId', getAllPlacedOrders)

router.post('/order/:userId', placeOrder)

router.delete('/order/:orderId', cancelOrder)


export default router