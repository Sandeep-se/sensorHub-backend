const user=require('./model')

 const add=async(req,res)=>{
    const {id,title,price,rating,image}=req.body
    const userId=req.cookies.userId
    const io = req.app.get('socket');
    if(!userId)
    return res.json('unauthorized')

    try{
        const User=await user.findById(userId)
        User.basket.push({id,title,price,rating})
        await User.save();
        io.emit('itemAdd', User)
        return res.json('add item in basket sucess')
    }
    catch(err)
    {
        res.json(err)
    }
}


const get=async(req,res)=>{
    const userId=req.cookies.userId
    const io=req.app.get('socket')
    if(!userId)
    return res.json({message:'unauthorized'})

    try{
        const User=await user.findById(userId)
        const email=User.email
        const basket=User.basket
        io.emit('user',User)
        res.json({basket,email})
    }
    catch(err)
    {
        res.json(err)
    }
}

const del=async(req,res)=>{
    const userId=req.cookies.userId
    const io=req.app.get('socket')
    if(!userId)
    {
        return res.json('unauthorized')
    }
    try{
        const itemId=req.params.id
        const User=await user.findById(userId);
        const itemIndex=User.basket.findIndex((item)=>item.id===itemId)

        if (itemIndex === -1) {
            return res.json('Item not found in basket');
        }

        User.basket.splice(itemIndex,1)
        await User.save()
        io.emit('removeItem',User)
        return res.json('remove item success')
    }
    catch(err)
    {
        console.log(err)
    }
  }
  const checkout=async(req,res)=>
  {
    const userId=req.cookies.userId
    const io=req.app.get('socket')
    if(!userId)
    return res.json('unauthorized')
    try{
        const User=await user.findById(userId)
        User.basket=[]
        await User.save()
        io.emit('itemAdd',User)
        return res.json('success')
    }
    catch(err)
    {
        res.json(err)
    }

  }
 module.exports={add,get,del,checkout}

