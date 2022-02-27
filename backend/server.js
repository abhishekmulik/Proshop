import express from 'express';
import products from './data/products.js';
import connectDb from './config/db.js';
import dotenv  from 'dotenv'

const app=express()
dotenv.config()

connectDb()

app.get('/',(req,res)=>res.send("Serever started"))
app.get('/api/products',(req,res)=>{res.json(products)})
app.get('/api/products/:id',(req,res)=>{
    const product=products.find(p=>p._id===req.params.id)
    res.json(product)
})


const PORT=process.env.PORT || 5000
console.log(process.env.NODE_ENV)
app.listen(PORT,console.log(`Server running on ${PORT}`))