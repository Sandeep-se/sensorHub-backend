const express = require('express');
const user = require('./model.js');
const connectDB = require('./db.js');
const cors = require('cors');
const app = express();
const router=require('./Router.js')
const cookieParser=require('cookie-parser')
const socketIo=require('socket.io')
const http=require('http'); 
require('dotenv').config()

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser({path: '/' }));
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true,
}));
app.use('/',router)

const server=http.createServer(app)
const io=socketIo(server,{cors:{
  origin: 'http://localhost:3000',
  methods:['GET', 'POST'],
  credentials: true
}})
app.set('socket',io)

io.on('connection',async(socket)=>
{
  console.log('connection')
  socket.on('disconnect',()=>{
    console.log('disconnected')
  })
})
server.listen(process.env.PORT, () => {
  console.log('Server is running on port 8000');
});
