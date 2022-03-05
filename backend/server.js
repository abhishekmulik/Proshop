import express from 'express';
import products from './data/products.js';
import connectDb from './config/db.js';
import dotenv  from 'dotenv'
import router from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app=express()
dotenv.config()

connectDb()

app.get('/',(req,res)=>res.send("Serever started"))
app.use('/api/products',router)

app.use(notFound)

app.use(errorHandler)

const PORT=process.env.PORT || 5000
console.log(process.env.NODE_ENV)
app.listen(PORT,console.log(`Server running on ${PORT}`))