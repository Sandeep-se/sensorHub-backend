const user=require('./model.js')
const express=require('express')

const signUp=async(req,res)=>
{
    const {email,password}=req.body;
    if(!email.includes('@gmail.com'))
    return res.json('`@gmail.com` is missing ')
    try{
        const check=await user.findOne({email:email,password:password})
        if(check )
        {
            return res.status(200).json('exist')
        }
        await user.create({email:email,password:password})
        res.json('signUp success')
    }
    catch(err)
    {
        res.json(err)
    }
}

const signIn=async(req,res)=>
 {
    const {email,password}=req.body
    const io=req.app.get('socket')
    try{
        const check=await user.findOne({email})
        if(check)
        {
            if(check.password===password)
            {
                res.cookie('userId', check._id.toString(), {
                    maxAge: 900000, 
                    httpOnly: true, 
                  });
                io.emit('user',check)
                return res.json('sigIn success')
            }
            res.json('password is invalid')
        }
        else{
            res.json('email is invalid')
        }
    }
    catch(err)
    {
        res.json(err)
    }
 }

const logout=(req,res)=>{
    res.clearCookie('userId')
    res.json('logout success')
  }
 module.exports={signUp,signIn,logout}