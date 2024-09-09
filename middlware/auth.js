const jws=require('jsonwebtoken')

module.exports=async(req,res,next)=>{
    try{
        const token= req.headers.authorization.split(' ')[1]
        const decodedToken= jws.verify(token,'SECRET_TOKEN_GENERATE')
        const userId=decodedToken.userId
        req.auth={
            userId:userId
        }
        next()
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}