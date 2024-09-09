const express=require('express')
const router=express.Router()
const auth=require('../middlware/auth')
const multer=require('../middlware/multer')
const controller=require('../controller/product')

router.post('/product',auth,multer,controller.createProduct)
router.get('/product',auth,controller.getProducts)
router.put('/product/:id',auth,multer,controller.editProduct)
router.delete('/product/:id',auth,controller.deleteProduct)
router.put('/productQuantity/:id',auth,controller.updateQuantity)
router.get('/oneProduct/:id', auth, controller.getOneProduct  )

module.exports=router

