import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDatabase from './Database/db.js'
import productsRouter from './Routes/productsRoute.js'
import { errorhandler, notFound } from './Middlewares/errorMiddleware.js'
dotenv.config()
// CONNECT DATABASE
connectDatabase()
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/products', productsRouter)

// Error middleware
app.use(notFound)
app.use(errorhandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))