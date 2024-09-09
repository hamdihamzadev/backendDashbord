const mongoose= require('mongoose')
const ordersSchema= mongoose.Schema({
    customer:{type:mongoose.Types.ObjectId,ref:'Customers',required:true},
    product:{type:mongoose.Types.ObjectId,ref:'product',required:true},
    quantity:{type:Number,required:true},
    total:{type:Number,required:true},
    date:{type:String,required:true},
    statussuivi:{type:String,required:true},
    statustable:{type:String,required:true},
    userId:{type:String,required:true},
})

module.exports=mongoose.model('orders',ordersSchema)