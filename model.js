const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    basket: [
        {
            id: {
                type: String,
                required: true,
            },
            title:{
                type:String,
                required:true,
            },
            price: {
                type:Number,
                required: true,
            },
            rating:{
                type:Number,
                required:true,
            },
            // image:{
            //     type:String,
            //     required:true,
            // }, 
        }
    ]
});
const user = mongoose.model('User', productSchema); 
module.exports = user   