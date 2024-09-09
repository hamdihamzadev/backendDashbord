const modelUser=require('../models/user')
const bcrypt=require('bcrypt')
const jsw=require('jsonwebtoken')

exports.signup=async(req,res)=>{
    try{
        const {fullName,age,email,password}=req.body
        const vrfUser= await modelUser.findOne({email:email})
        if(vrfUser){
            return res.status(400).json({message:'User already exists'})
        }
        
        // hash password
        const passwordCrypt= await bcrypt.hash(password,10)
        const newUser= new modelUser({
            fullName,
            age,
            email,
            password:passwordCrypt,
        })
        await newUser.save()
        res.status(200).json({message:'user is created'})

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.getUsers=async(req,res)=>{
    try{
        const usrs=await modelUser.find()
        res.status(200).json({users:usrs})
    }

    catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.getUser=async(req,res)=>{
    try{
        const userId=req.auth.userId
        const user=await modelUser.findById(userId)
        res.status(200).json({user}) 
    }

    catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user=await modelUser.findOne({email:email})
        if(!user){
            return res.status(400).json({message:'user not found'})
        }
        const vrfPassword=await bcrypt.compare(password,user.password)
        if(!vrfPassword){
            return res.status(400).json({message:'passwrod is incorrecte'})
        }
        res.status(200).json({
            userId:user._id,
            token:jsw.sign(
                {userId:user._id},
                'SECRET_TOKEN_GENERATE',
                {expiresIn: '24h'}
            )
        })
        
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}


