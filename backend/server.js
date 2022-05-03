import express from 'express';
import products from './data/products.js';
import connectDb from './config/db.js';
import dotenv  from 'dotenv'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app=express()
app.use(express.json())
dotenv.config()

connectDb()

app.get('/',(req,res)=>res.send("Serever started"))
app.use('/api/products',productRoutes)
app.use('/api/users/',userRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT=process.env.PORT || 5000
console.log(process.env.NODE_ENV)
app.listen(PORT,console.log(`Server running on ${PORT}`))