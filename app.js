const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const routeUser=require('./route/user')
const routeCategory=require('./route/category')
const routerProduct=require('./route/prodcuts')
const routerCustomers= require('./route/customers')
const routerOrders=require('./route/orders')
const routerConversion= require('./route/conversionOrders')

// CONNECTE MONGOO DB
const url= process.env.MONGO_URI
const connecteMongooDb= async()=>{
    try{
        await mongoose.connect(url)
        console.log('database is connected')
    }
    catch(error){
        console.log(error)
    }
}
connecteMongooDb()
// CORS
app.use(cors({
    origin:'https://project01-ibtu.vercel.app',
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-Type', 'Authorization']
}))

// JSON
app.use(express.json())

// API
app.use('/images', express.static('images'));
app.use('/api',routeUser)
app.use('/api',routeCategory)
app.use('/api',routerProduct)
app.use('/api',routerCustomers)
app.use('/api',routerOrders)
app.use('/api',routerConversion)
// management route not found 
app.use((req, res, next) => {
    res.status(404).json({ message: 'Page not found' });
  });

module.exports=app