import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import sellerRoutes from './routes/sellerRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000

connectDB()

app.use('/auth', authRoutes)
app.use('/seller', sellerRoutes)
app.use('/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})