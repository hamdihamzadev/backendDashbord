const express=require('express')
const router=express.Router()
const auth=require('../middlware/auth')
const controller=require('../controller/orders')

router.post('/order',auth,controller.createOrder)

router.get('/orders',auth,controller.getOrders)
router.get('/order/:id',auth,controller.getOneOrder)
router.get('/orders/customers/:id',auth,controller.getOrdersCustomer)
router.get('/getOrdersAllCustomer/:month',auth,controller.getOrdersAnyCustomer)

router.delete('/order/:id',auth,controller.deleteOrder)

router.put('/order/statusTable/:id',auth,controller.updatStatus)
router.put('/order/:id',auth, controller.updateOrder)
router.put('/order/sendOrder/:id',auth,controller.sendOrder)

module.exports=router