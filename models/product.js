const mongoose=require('mongoose')

const productSchema= mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    description:{type:String,required:true},
    category:{type:mongoose.Types.ObjectId,ref:'category',required:true},
    image:{type:String,required:true},
    date:{type:String,required:true},
    userId:{type:String,required:true},

})

module.exports=mongoose.model('product',productSchema)