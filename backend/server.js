const express=require('express')
const app=express()
const cors=require("cors")
const multer=require("multer")
const upload=multer({dest:"uploads/"})
app.use(cors())
app.use(express.json());
app.use("/uploads",express.static("uploads"))
require("dotenv").config()
const User=require("./models/user")
const Blog=require("./models/blog")
const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
.then(function(){
    console.log("connected to the database successfully")
})
.catch(function(err){
    console.log("error in connecting database",err)
})




app.post("/register",async function(req,res){
    const {name,email,password}=req.body
   try{
    const user=await User.create({
        name:name,
        email:email,
        password:password
    })
    res.json({
        message:"user register successfully",
        user:user
    })

   }catch (error){
    console.log(error)
    res.status(500).json({
        message:"error registering user"
    })
   }
})
app.post("/login", async function(req,res){
    const {email,password}=req.body
    try{
        const user=await User.findOne({
            email:email,
            
            
        })
        if(user===null){
            res.json({
                message:"user not found! invalid email"
            })
        }else{
            if (user.password===password){
                res.json({
                message:"login request successful",
                user:user
    })
            }else{
                res.json({
                   message:"wrong password"
                })
            
            }
              
        }
       
    
    
    }catch(err){
        console.log(err)
        res.status(500).json({
          message:"error loging user"
        })
    }
    
})
app.post("/blogs",upload.single("image"), async function(req,res){
    const { title, category,content}=req.body
     console.log(req.file)
    try{
    const blog= await Blog.create({
     title:title,
     category:category,
     content:content,
     image:req.file? req.file.filename:""
    
    })
    res.json({
        message:"blog created successfully"
    })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"error occured while creating blog"
        })
    }
})
app.get("/blogs", async function(req,res){
    try{
    const blogs=await Blog.find();
    res.json({
        message:"blog retrived successfully",
        blogs:blogs
    })}catch(error){
        console.log(error);
        res.status(500).json({
            message:"error occured while retriving blogs"
        })
    }
})

app.listen(3000)