const express=require('express')
const router=express.Router()

const {signUp,signIn,logout}=require('./Login&Signin')
const {add,get,del,checkout}=require('./Basket')
const chat=require('./Chat')

router.get('/',(req,res)=>
{
    res.json('hello ')
})

router.post('/signUp',signUp)
router.post('/signIn',signIn)
router.post('/logout',logout)
router.post('/add',add)
router.get('/get',get)
router.delete('/del/:id',del)
router.delete('/checkout',checkout)
router.post('/chat',chat)

module.exports=router