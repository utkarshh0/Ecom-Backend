import express from 'express'
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js'
import { authorize } from '../middlewares/roleMiddleware.js'

const router = express.Router()


router.get('/all', getAllProducts)

router.get('/:producutId', getProductById)

router.use(authorize('seller', 'admin'))

router.post('/', addProduct)

router.patch('/', updateProduct)

router.delete('/', deleteProduct)


export default router