const express=require('express')
const router=express.Router()
const controller=require('../controller/conversionOrders')
const auth=require('../middlware/auth')

router.post('/order/conversion',auth,controller.create)
router.get('/orderConversionStatus',auth,controller.get)
router.delete('/orderConversionStatus/:id',auth,controller.delete)

module.exports=router