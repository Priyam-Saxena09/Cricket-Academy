const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:
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
    password:
    {
        type:String,
        required:true,
        minlength:8,
    }
})

const user = mongoose.model("user",schema)
module.exports = user