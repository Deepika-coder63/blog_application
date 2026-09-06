const mongoose=require('mongoose');
const blogSchema=new mongoose.Schema({
    title:String,
    category:String,
    content:String,
    image:String
})
const Blog=mongoose.model("Blog",blogSchema)
module.exports=Blog