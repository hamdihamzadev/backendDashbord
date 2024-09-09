const modelCategory = require('../models/category')
const modelProduct=require('../models/product')

exports.createProduct=async (req,res)=>{
    try{
        const {name,price,quantity,description,category,date}=req.body
        // verification category
        const idcategory= await modelCategory.findById(category)

        if(!idcategory){
            return  res.status(404).json({message:'category not found'})
        }
        const newProduct= new modelProduct({
            name,
            price,
            quantity,
            description,
            category:category,
            image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            date:date,
            userId:req.auth.userId
        })

        await newProduct.save()
        res.status(201).json({message:'product created with success'})
    }

    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.getProducts= async (req,res)=>{

    try{
        const products= await modelProduct.find({userId:req.auth.userId}).populate('category')
        if(!products){
            return res.status(404).json({message:'this is user dont have any product'})
        }
        res.status(200).json({products:products})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }

}

exports.editProduct= async (req,res)=>{
    try{
        const {id} = req.params
        const product= await modelProduct.findById(id)
        if(!product ){
          return  res.status(404).json({message:'Cannot found product '})
        }
        if(product.userId!== req.auth.userId){
            return  res.status(404).json({message:'Cannot found users '})
        }
        const update={}
        update.name=req.body.name
        update.price=req.body.price
        update.quantity=req.body.quantity
        update.description=req.body.description
        update.category=req.body.category
        if(req.file){
            update.image=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        update.date=req.body.date

        await modelProduct.findByIdAndUpdate(id,update,{
            new: true, runValidators: true  // Options : renvoyer le nouveau document mis à jour et exécuter les validateurs
        })

        res.status(200).json({message:'product is update with successfully'})

    }

    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.deleteProduct = async (req,res)=>{
    try{
        const {id}=req.params
        const product = await modelProduct.findById(id)
        if(!product){
            return res.status(404).json({message:'Product not found'})
        }
        await modelProduct.findByIdAndDelete(id)
        res.status(200).json({message:'product is deleted'})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.updateQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        
        // Trouver le produit
        const product = await modelProduct.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Vérifier l'autorisation
        if (product.userId !== req.auth.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Mettre à jour la quantité
        const updatedProduct = await modelProduct.findByIdAndUpdate(
            id,
            { $set: { quantity: quantity } }, // Mettre à jour la quantité
            { new: true } // Retourner le document mis à jour
        );

        if (!updatedProduct) {
            return res.status(500).json({ message: 'Product update failed' });
        }

        res.status(200).json({ message: 'Quantity updated successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOneProduct=async (req,res)=>{
    try{
        const {id}=req.params
        const product= await modelProduct.findById(id)
        if(!product){
            return res.status(404).json({message:'product not found'})
        }
        if(product.userId!==req.auth.userId){
            return res.status(404).json({message:'userId is not found'})
        }
        res.status(200).json({product:product})
    }

    catch(error){
        res.status(500).json({ message: error.message });
    }
}


