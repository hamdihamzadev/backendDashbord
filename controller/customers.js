const modelCustomers=require('../models/customers')

exports.createCustomer=async (req,res)=>{
    try{
        const {name,gender,contry,city,adresse,phone,gmail,date}=req.body
        const customer= new modelCustomers({
            name,
            gender,
            contry,
            city,
            adresse,
            phone,
            gmail,
            date,
            userId:req.auth.userId
        })
        await customer.save()
        res.status(201).json({message:'customer is created with success'})
    }

    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.GetAllCustomers= async (req,res)=>{
    try{
        const userId=req.auth.userId
        if(userId===''){
            return res.status(404).json({message:'userid is not defined'})
        }
        const customers= await modelCustomers.find({userId})
        res.status(200).json({Allcustomers:customers})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.deleteCustomer=async (req,res)=>{
    try{
        const {id}=req.params
        const customer= await modelCustomers.findById(id)
        if(!customer){
            return  res.status(404).json({message:'not found this customer'})
        }
        if(customer.userId!==req.auth.userId){
            return  res.status(404).json({message:'userID is different'})
        }
        const deleteCustomer=await modelCustomers.findByIdAndDelete(id)
        if(!deleteCustomer){
            return  res.status(404).json({message:'cutomers is not deleted'})
        }
        res.status(200).json({message:'cutomers is deleted'})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.editCustomer= async (req,res)=>{
    try{
        const {id}=req.params
        const {name,gender,contry,city,adresse,phone,gmail,date}=req.body
        const customer= await modelCustomers.findById(id)
        if(!customer){
            return  res.status(404).json({message:'not found this customer'})
        }
        if(customer.userId!==req.auth.userId){
            return  res.status(404).json({message:'userID is different'})
        }
        const update={}
        update.name=name
        update.gender=gender
        update.contry=contry
        update.city=city
        update.adresse=adresse
        update.phone=phone
        update.gmail=gmail
        update.date=date
        await modelCustomers.findByIdAndUpdate(id,update,{
            new: true, runValidators: true  // Options : renvoyer le nouveau document mis à jour et exécuter les validateurs
        })
        res.status(200).json({message:'customer is update with success'})
        
    }

    catch(error){
        res.status(500).json({message:error.message})
    }
}


