const modelConversion=require('../models/conversionOrders')

exports.create=async(req,res)=>{
    try{
        const {status,date}=req.body
        const conversionOrder=new modelConversion({
            status,
            date,
            userId:req.auth.userId
        })
        await conversionOrder.save()
        res.status(201).json({message:'status conversion is created with success'})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.get=async(req,res)=>{
    try{
        const conversionOrders= await modelConversion.find({ userId: req.auth.userId })
        if(!conversionOrders){
            return res.status(404).json({message:'userId Is not true to get conversion orders'})
        }
        res.status(200).json({conversionOrders:conversionOrders})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.delete=async (req,res)=>{
    try{
        const {id}=req.params
        const order=await modelConversion.findById(id)
        if(!order){
            return res.status(404).json({message:'not found oreder status conversion'})
        }
        if(order.userId!==req.auth.userId){
            return res.status(404).json({message:'userId Is not true to get conversion orders'})
        }
        const remove= await modelConversion.findByIdAndDelete(id)
        if(!remove){
            return res.status(404).json({message:'conversion orders is not deleted'})
        }
        res.status(200).json({message:'conversion orders is deleted'})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}