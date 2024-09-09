const mongoose=require('mongoose')

const shemaConversion=mongoose.Schema({
    status:{type:String,required:true},
    date:{type:String,required:true},
    userId:{type:String,required:true} 
})

module.exports=mongoose.model('conversionOrders', shemaConversion)