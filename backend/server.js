const express=require('express')
const cors=require("cors")
const multer=require("multer")
const upload=multer({dest:"uploads/"})
const app=express()
app.use(cors())
app.use(express.json());
app.post("/register",function(req,res){
    const {name,email,password}=req.body
    console.log(name)
    console.log(email)
    console.log(password)
    res.json({
        message:"registration request received"
    })
})
app.post("/login",function(req,res){
    const {email,password}=req.body
    console.log(email)
    console.log(password)
    res.json({
        message:"login request successfull"
    })
})
app.post("/blogs",upload.single("image"),function(req,res){
    const { title, category,content}=req.body
    console.log("title:",title)
    console.log("category :",category)
    console.log("content:",content)
    console.log("image:",req.file)
    res.json({
        message:"blog created successfully"
    })
})

app.listen(3000)