const modelOrdes= require('../models/orders')
const modelCustomer=require('../models/customers')

exports.createOrder= async (req,res)=>{
    try{
        const {customer,product,quantity,total,date,statussuivi,statustable}=req.body
        const newOrder= new modelOrdes({
            customer,
            product,
            quantity,
            total,
            date,
            statussuivi,
            statustable,
            userId:req.auth.userId
        })
        await newOrder.save()
        res.status(201).json({message:'Order is created with success'})

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.getOrders=async(req,res)=>{
    try{
        const orders= await modelOrdes.find({userId:req.auth.userId}).populate('customer').populate({
            path:'product',
            populate:{
                path:'category',
                model:'category'
            }
        })
        if(!orders){
            return res.status(404).json({message:'dont have any userId or orders'})
        }
        res.status(200).json({orders:orders})

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
    
}

exports.getOneOrder= async (req,res)=>{
    try{
        const {id}=req.params
        const order=await modelOrdes.findById(id)
        if(!order){
            return res.status(404).json({message:'dont have any order'})
        }
        if(order.userId!==req.auth.userId){
            return res.status(404).json({message:'userid is not connected'})
        }
        res.status(200).json({order:order})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.deleteOrder= async (req,res)=>{
    try{
        const {id}=req.params
        const order= await modelOrdes.findById(id)
        if(!order){
            return res.status(404).json({message:'order not found'})
        }
        if(order.userId!==req.auth.userId){
            return res.status(404).json({message:'useIdr is not found'})
        }
        const deleteOrder= await modelOrdes.findByIdAndDelete(id)
        if(!deleteOrder){
            return  res.status(404).json({message:'order is not deleted'})
        }
        res.status(200).json({message:'order is deleted with success'})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.updatStatus= async (req,res)=>{
    try{
        const {id}=req.params
        const {statustable}=req.body
        // find order
        const order= await modelOrdes.findById(id)
        if(!order){
            return res.status(404).json({message:'order not found'})
        }
        if(order.userId!==req.auth.userId){
            return res.status(404).json({message:'userId is not found'})
        }
        // update status
        const updateStatus= await modelOrdes.findByIdAndUpdate(
            id,
            {$set:{statustable:statustable}},
            {new:true}
        )

        if (!updateStatus) {
            return res.status(500).json({ message: 'status is  update failed' });
        }

        res.status(200).json({message:'Status updated successfully'})


    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.sendOrder= async (req,res)=>{
    try{
        const {id}=req.params
        const {statussuivi,statustable}=req.body
        const order= await modelOrdes.findById(id)
        if(!order){
            return res.status(404).json({message:'order not found'})
        }
        if(order.userId!==req.auth.userId){
            return res.status(404).json({message:'userId is not found'})
        }
        // update status
        const updateStatus= await modelOrdes.findByIdAndUpdate(
            id,
            {$set:{statussuivi:statussuivi,statustable:statustable}},
            {new:true}
        )

        if (!updateStatus) {
            return res.status(500).json({ message: 'status is update failed' });
        }

        res.status(200).json({message:'Order is send with successfully'})

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.updateOrder= async (req,res)=>{
    try{
        const {id}=req.params
        const {quantity,total}=req.body
        const order= await modelOrdes.findById(id)
        if(!order){
            return res.status(404).json({message:'order not found'})
        }
        if(order.userId!==req.auth.userId){
            return res.status(404).json({message:'useIdr is not found'})
        }
       
        await modelOrdes.findByIdAndUpdate(
            id,
            {$set:{quantity:quantity,total:total}},
            {new:true,runValidators: true}
        )
        res.status(200).json({message:'order is update with success'})
    }

    catch(error){
        res.status(500).json({message:error.message})
    }
}


exports.getOrdersCustomer=async (req,res)=>{
    try{
        const {id}=req.params
        const orders=await modelOrdes.find({customer:id,userId:req.auth.userId})
        .populate({
            path:'product',
            populate:{
                path:'category',
                model:'category'
            }
        })
        if(!orders){
            return res.status(404).json({message:'No orders found for this customer and user.'})
        }
      
        res.status(200).json({orders:orders})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}


exports.getOrdersAnyCustomer=async(req,res)=>{
    try{
        const {month}=req.params
        const numericMonth = parseInt(month, 10);
        console.log(month)
      
        const orders=await modelOrdes.find({userId:req.auth.userId}).populate({
            path:'product',
            populate:{
                path:'category',
                model:'category'
            }
        })

        if(!orders){
            return res.status(404).json({message:'not found any orders'})
        }
        const customers=await modelCustomer.find({userId:req.auth.userId})
        const customersId=customers.map(ele=>{
            return {id:ele._id.toString(),name:ele.name,city:ele.city,phone:ele.phone}
        })

        const orderscustomers=customersId.map(ele=>{

            const filteOrders= orders.filter( order => order.customer.toString() === ele.id )
            const ordersMonth=filteOrders.filter(order=> new Date(order.date).getMonth()+1 ===numericMonth )
            return {customer:ele,orders:ordersMonth}
        })
        res.status(200).json({orderscustomers:orderscustomers})

       
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}