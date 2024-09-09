const express=require('express')
const router= express.Router()
const auth=require('../middlware/auth')
const controller=require('../controller/customers')

router.post('/customers',auth,controller.createCustomer)
router.get('/customers',auth,controller.GetAllCustomers)
router.put('/customers/:id',auth,controller.editCustomer)
router.delete('/customers/:id',auth,controller.deleteCustomer)


module.exports=router


