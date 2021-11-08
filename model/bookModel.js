const mongoose = require('mongoose');

const {Schema } = mongoose;

const bookSchema = new Schema({
    title:String,
    author:String,
    price:Number, 
    rate:Number
})

module.exports = mongoose.model('book' , bookSchema );
