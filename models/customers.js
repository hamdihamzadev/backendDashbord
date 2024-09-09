const mongoose=require('mongoose')

const shemaCustomer= mongoose.Schema({
    name:{type:String,required:true},
    gender:{type:String,required:true},
    contry : {type:String,required:true},
    city:{type:String,required:true} ,
    adresse: {type:String,required:true} ,
    phone:{type:Number,required:true},
    gmail: {type:String,required:true} ,
    date:{type:String,required:true} ,
    userId:{type:String,required:true} 
})

module.exports=mongoose.model('Customers',shemaCustomer)