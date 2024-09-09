const express=require('express')
const router=express.Router()
const controller=require('../controller/category')
const auth=require('../middlware/auth')
const multer= require('../middlware/multer')

router.post('/category',auth,multer,controller.createCategory)
router.get('/category', auth,controller.getCategory)
router.delete('/category/:id',auth,controller.deleteCtg)
router.put('/category/:id',auth,multer,controller.updateCtg)


module.exports=router