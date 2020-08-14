const mongoose = require("mongoose")
const schema2 = new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
    },
    fname:
    {
        type:String,
        required:true,
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    phone:
    {
        type:String,
        required:true,
        unique:true
    },
    address:
    {
        type:String,
        required:true,
    },
    age:
    {
        type:Number,
        required:true,
    },
    type:
    {
        type:String,
        required:true,
    }
})

const regis = mongoose.model("regis",schema2)
module.exports = regis