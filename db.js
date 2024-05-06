const mongoose=require('mongoose')
require('dotenv').config()
const connectDB=async()=>
{
mongoose.connect(process.env.DB_API,{
    useNewUrlParser: true,
    useUnifiedTopology: true})
    mongoose.connection.on('error',console.error.bind(console,'connection error'))
    mongoose.connection.once('open', () => console.log('mongodb connected'))
}
module.exports=connectDB
//"mongodb://127.0.0.1:27017/user"


// mongoose.connect('mongodb://127.0.0.1:27017/user')
//     .then(
//     ()=>{
//         console.log('connected')
//     })
//     .catch(err=>console.log(err))