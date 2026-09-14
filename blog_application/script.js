
//register form
let form= document.getElementById("RegisterForm")
if (form){
form.addEventListener("submit", async  function(event){
    event.preventDefault();
    let name=document.getElementById("name").value
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    let confirmPassword=document.getElementById("confirmPassword").value
    if(password!==confirmPassword){
        alert("passwords doesnot match")
        return;
    }
    let response=await fetch("http://localhost:3000/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            email:email,
            password:password
        })
    })
    let data =await response.json();
    alert(data.message)
    
    //alert("Registration successful!")
    location.reload()

})
}


//login form
let loginform=document.getElementById("loginForm")
if (loginform){
loginform.addEventListener("submit", async function(event){
    event.preventDefault()
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    let response=await fetch("http://localhost:3000/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    })
    let data=await response.json()
    console.log(data)
    if(data.token){
        localStorage.setItem("token",data.token)
    }
    alert(data.message)
    
    //location.reload()
})
}

//create blog
let blogform=document.getElementById("blogForm")
if (blogform){
    blogform.addEventListener("submit", async function(event){
        event.preventDefault();
        let title=document.getElementById("title").value;
        let category=document.getElementById("category").value;
        let content=document.getElementById("text-area").value;
        let image=document.getElementById("image").files[0];
        let formData=new FormData();
        formData.append("title",title);
        formData.append("category",category)
        formData.append("content",content)
        formData.append("image",image)
        let token=localStorage.getItem("token")
        let response=await fetch("http://localhost:3000/blogs",{
            method:'POST',
            headers:{
                "Authorization":`Bearer ${token}`
            },
            body:formData
        })
        let data=await response.json()
        alert(data.message)
        //alert("blog published successfully !")
        location.reload()

    })
}
//protection

if(document.getElementById("blogContainer")){
let token=localStorage.getItem("token")
if(!token){
    window.location.href="login.html"
}
}

//fetch blogs from database
//display the blogs
async function getBlogs(){
    let token=localStorage.getItem("token")
    let response=await fetch("http://localhost:3000/blogs",{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    });
    let data=await response.json();
    let blogContainer=document.getElementById("blogContainer")
    data.blogs.forEach((blog)=>{{
         let cards=document.createElement("div")
        cards.classList.add("blog-card")
        //cards.dataset.id=blog._id;
        cards.innerHTML=
        `<img src="http://localhost:3000/uploads/${blog.image}" alt="blog image">
        <h4>${blog.title}</h4>
         <p>${blog.content}</p>
         <p><b>Category:</b>${blog.category}</p>
         <button class="edit-btn" onclick="editBlog('${blog._id}')">Edit</button>
         <button class="delete-btn"  onclick="deleteBlog('${blog._id}')">Delete</button>`
         
        blogContainer.appendChild(cards)
    }})
    
       
}
function editBlog(id){
    window.location.href=`edit_blog.html?id=${id}`
}
if(document.getElementById("blogContainer")){
    getBlogs();
}

//update blog
const params=new URLSearchParams(window.location.search)
const id=params.get("id")
console.log(id)
async function getBlog(){
    let response=await fetch(`http://localhost:3000/blogs/${id}`)
    let data=await response.json()
    console.log(data)
    document.getElementById("title").value=data.blog.title
    document.getElementById("category").value=data.blog.category
    document.getElementById("content").value=data.blog.content
}
let editForm=document.getElementById("editBlogForm")
if(editForm){
getBlog()
}

if(editForm){
editForm.addEventListener("submit",async (event)=>{
    event.preventDefault()
    let title=document.getElementById("title").value
    let category=document.getElementById("category").value
    let content=document.getElementById("content").value
    let image=document.getElementById("image").files[0]
    let formData=new FormData()
    formData.append("title",title)
    formData.append("category",category)
    formData.append("content",content)
    if(image){
        formData.append("image",image)
    }
    let response=await fetch(`http://localhost:3000/blogs/${id}`,{
        method:"PUT",
       body:formData
        })
          let data=await response.json()
    alert(data.message)
    })
  
}



//delete blog
async function deleteBlog(id){
let response=await fetch(`http://localhost:3000/blogs/${id}`,{
    method:"DELETE"
})
let data=await response.json()
alert(data.message)
location.reload()
}



//logout button
let logoutBtn=document.getElementById("logoutBtn")
if(logoutBtn){
    logoutBtn.addEventListener("click",function(){
        localStorage.removeItem("token")
        window.location.href="login.html"
    })
}

//profile
async function getProfile(){
    let token=localStorage.getItem("token")
    let response=await fetch("http://localhost:3000/profile",{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    let data=await response.json()
    document.getElementById("profileName").textContent=data.name
    document.getElementById("profileEmail").textContent=data.email
}
if(document.getElementById("profileName")){
    getProfile()
}


//hamburger
const hamburger=document.getElementById("hamburger")
const navLinks=document.getElementById("navLinks")
if(hamburger){
hamburger.addEventListener("click",function(){
    navLinks.classList.toggle("active")
})
}
