import express from 'express'
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js'

const router = express.Router()

router.get('/products/:sellerId', getAllProducts)

router.post('/product/:sellerId', addProduct)

router.delete('/product/:id', deleteProduct)

router.patch('/product/:id', updateProduct)

export default router