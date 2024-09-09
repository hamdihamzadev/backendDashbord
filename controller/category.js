const modelCategory=require('../models/category')

exports.createCategory=async(req,res)=>{
    try{
        const {name,image}=req.body
        const newCategory= new modelCategory({
            userId:req.auth.userId,
            name,
            image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        await newCategory.save()
        res.status(200).json({message:'category is created with success'})
        
    }

    catch(error){
        res.status(500).json({message:error.message})
    }
}


exports.getCategory= async(req,res)=>{
    try{
        const category= await modelCategory.find({userId:req.auth.userId})
        if(!category){
            return res.status(400).json({message:'category is none'})
        }
        res.status(201).json({category:category})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.deleteCtg= async(req,res)=>{
    try{
        const {id}=req.params
        const category= await modelCategory.findByIdAndDelete(id)
        if(!category){
            return res.status(404).json({message:'category not found'})

        }
        res.status(200).json({message:'Category is deleted with success'})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}




exports.updateCtg = async (req, res) => {
    try {
        
        const {id}=req.params
        const category= await modelCategory.findById(id)
        if(!category || category.userId !== req.auth.userId ){
            return res.status(404).json({ message: 'Category not found or not authorized to update' })

        }
        const update={}
        if(req.body.name){
            update.name=req.body.name
        }
      
        if(req.file){
             update.image=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
      
        await modelCategory.findByIdAndUpdate(id,update,{
            new: true, runValidators: true  // Options : renvoyer le nouveau document mis à jour et exécuter les validateurs
        })

        res.status(200).json({message:'Category updated successfully'})
       

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};