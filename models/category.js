const mongoose=require('mongoose')

const SchemaCategory= mongoose.Schema({
    userId:{type:String,required:true},
    name:{type:String,required:true},
    image:{type:String,required:true}},
   { timestamps: true })

module.exports=mongoose.model('category',SchemaCategory)