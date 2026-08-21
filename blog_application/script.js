
//register form
let form= document.querySelector("#RegisterForm")
if (form){
form.addEventListener("submit",function(event){
    event.preventDefault();
    alert("Registration successful!")
    location.reload()

})
}


//login form
let loginform=document.querySelector("#loginForm")
if (loginform){
loginform.addEventListener("submit",function(event){
    event.preventDefault()
    alert("Login successful")
    location.reload()
})
}

//create blog
let blogform=document.querySelector("#blogForm")
if (blogform){
    blogform.addEventListener("submit",function(event){
        event.preventDefault()
        alert("blog published successfully !")
        location.reload()

    })
}

//hamburger
const hamburger=document.getElementById("hamburger")
const navLinks=document.getElementById("navLinks")
hamburger.addEventListener("click",function(){
    navLinks.classList.toggle("active")
})
