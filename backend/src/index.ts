import express from 'express'
import { sampleProducts } from './data'
import cors from 'cors'
import { productRouter } from './routers/productRouter'
import { seedRouter } from './routers/seedRouter'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

//process.env.MONGODB_URI || 

const MONGODB_URI = 'mongodb://127.0.0.1:27017/ecommercedb'
mongoose.set('strictQuery', true)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(() => {
    console.log('error mongodb')
  })

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)

app.use('/api/products', productRouter)
app.use('/api/seed', seedRouter)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})