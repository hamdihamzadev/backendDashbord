const express=require('express')
const route= express.Router()
const controller=require('../controller/user')
const auth=require('../middlware/auth')

route.post('/signup',controller.signup)
route.get('/signup',controller.getUsers)
route.get('/getUser',auth,controller.getUser)
route.post('/login', controller.login)

module.exports=route