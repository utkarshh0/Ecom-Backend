import express from 'express'
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js'

const router = express.Router()

router.get('/products', getAllProducts)

router.post('/product', addProduct)

router.delete('/product/:productId', deleteProduct)

router.patch('/product/:productId', updateProduct)

export default router