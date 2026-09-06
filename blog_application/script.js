
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
    alert(data.message)
    //alert("Login successful")
    location.reload()
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
        let response=await fetch("http://localhost:3000/blogs",{
            method:'POST',
            body:formData
        })
        let data=await response.json()
        alert(data.message)
        //alert("blog published successfully !")
        location.reload()

    })
}

//fetch blogs from database
//display the blogs
async function getBlogs(){
    let response=await fetch("http://localhost:3000/blogs");
    let data=await response.json();
    let blogContainer=document.getElementById("blogContainer")
    data.blogs.forEach((blog)=>{{
         let cards=document.createElement("div")
        cards.classList.add("blog-card")
        cards.innerHTML=
        `<img src="http://localhost:3000/uploads/${blog.image}" alt="blog image">
        <h4>${blog.title}</h4>
         <p>${blog.content}</p>
         <p><b>Category:</b>${blog.category}</p>`
        blogContainer.appendChild(cards)
    }})
    
       
}
if(document.getElementById("blogContainer")){
    getBlogs();
}

//hamburger
const hamburger=document.getElementById("hamburger")
const navLinks=document.getElementById("navLinks")
if(hamburger){
hamburger.addEventListener("click",function(){
    navLinks.classList.toggle("active")
})
}
