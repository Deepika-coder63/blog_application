const mongoose=require('mongoose');
const blogSchema=new mongoose.Schema({
    title:String,
    category:String,
    content:String,
    image:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    }
})
const Blog=mongoose.model("Blog",blogSchema)
module.exports=Blog