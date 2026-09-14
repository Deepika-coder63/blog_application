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
const jwt=require("jsonwebtoken")
mongoose.connect(process.env.MONGODB_URI)
.then(function(){
    console.log("connected to the database successfully")
})
.catch(function(err){
    console.log("error in connecting database",err)
})

//authenticate
function authenticateToken(req,res,next){
    const authHeader=req.headers["authorization"]
    const token=authHeader && authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message:"access denied"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()

    }catch(error){
        return res.status(403).json({
            message:"invalid token"
        })
    }
}


//register
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

//login
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
                const token=jwt.sign(
                    {userId:user._id},
                    process.env.JWT_SECRET
                    )
                
                res.json({
                message:"login request successful",
                user:user,
                token:token
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

//profile
app.get("/profile",authenticateToken,async function(req,res){
    try{
        const user=await User.findById(req.user.userId)
        res.json({
            name:user.name,
            email:user.email
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"error fetching profile"
        })
    }
})









//blogs
app.post("/blogs",upload.single("image"),authenticateToken, async function(req,res){
    const { title, category,content}=req.body
     console.log(req.file)
    try{
    const blog= await Blog.create({
     title:title,
     category:category,
     content:content,
     image:req.file? req.file.filename:"",
     userId:req.user.userId
    
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

app.get("/blogs",authenticateToken, async function(req,res){
    try{
    const blogs=await Blog.find({
        userId:req.user.userId
    })
    res.json({
        message:"blog retrived successfully",
        blogs:blogs
    })
}catch(error){
        console.log(error);
        res.status(500).json({
            message:"error occured while retriving blogs"
        })
    }
})
app.get("/blogs/:id",async function(req,res){
    try{
    const id=req.params.id
    const blog=await Blog.findById(id)
    res.json({
        message:"success!",
        blog:blog
    })
}catch(error){
    console.log(error)
    res.status(500).json({
        message:"error occured"
    })
}
})

app.put("/blogs/:id",upload.single("image")  , async (req,res)=>{
     try{
        
        const id=req.params.id;
        const data={
            title:req.body.title,
            category:req.body.category,
            content:req.body.content
        }
        if(req.file){
            data.image=req.file.filename;
        }
        const blog=await Blog.findByIdAndUpdate(id,data,
        {new:true})
        res.json({
            message:"blog updated successfully",
            blog:blog
        })
        
        
        
     }catch(error){
        console.log(error)
        res.status(500).json({
            message:"error  occured while updating blog"
        })
     }
})

app.delete("/blogs/:id",async function(req,res){
    try{
    const id=req.params.id;
    const blog=await Blog.findByIdAndDelete(id)
    res.json({
      message:"deleted successfully"
    })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"error while deleting blog"
        })
    }

})
app.listen(3000);