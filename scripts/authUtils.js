function userAuthChanged(loggedIn){

 const showLoggedIn = document.querySelectorAll('.showLoggedIn');
 showLoggedIn.forEach((elem)=>{
     if(loggedIn){
        elem.classList.remove('hidden');

     }else{
        elem.classList.add('hidden');
     }

 })

 const showLogin = document.querySelectorAll('.showLogin');
 showLogin.forEach((elem)=>{
     if(!loggedIn){
        elem.classList.remove('hidden');

     }else{
        elem.classList.add('hidden');
     }

 })

 const showLoggedAdmin= document.querySelectorAll('.showLoggedAdmi');

 showLoggedAdmin.forEach((elem)=>{
    if(loggedIn && loggedUser.admin){
        console.log(showLoggedAdmin)
        console.log(loggedUser.admin);
        elem.classList.remove('hidden');
    } else {
        elem.classList.add('hidden');

    }
     
 })
    

}
