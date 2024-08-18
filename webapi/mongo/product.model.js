//kết nối collection product

//Kết nối collection category
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId =Schema.ObjectId


//khai báo các field
const productSchema = new Schema({
    name:{type:String, require: true},
    img:{type:String, require: true},
    price:{type:Number, require: true},
    description:{type:String, require: true},
    category:{type:String, require: true}


})

module.exports = mongoose.models.product || mongoose.model('product',productSchema) //kiểm tra xem có product chưa
