const mongoose = require('mongoose');

const {Schema } = mongoose;

const userSchema = new Schema({
        name:String,
        contactNum:Number,
        email:String , 
        password:String ,
        role :{
            type:String,
            default:'Guest',
            enum:['Guest' , 'BasicUser' , 'AdminUser']
        }
})


module.exports = mongoose.model('User' , userSchema );







