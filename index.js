import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import sellerRoutes from './routes/sellerRoutes.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { authenticate } from './middlewares/authMiddleware.js'
import { authorize } from './middlewares/roleMiddleware.js'

dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000

connectDB()

app.use('/auth', authRoutes)

app.use(authenticate)
app.use('/user', userRoutes)
app.use('/seller', sellerRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)
app.use('/admin', adminRoutes)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})