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

 const showLoggedAdmin= document.querySelector('.showLoggedAdmi');

    if(loggedIn && loggedUser.admi){
        showLoggedAdmin.classList.remove('hidden');
    } else {
        showLoggedAdmin.classList.add('hidden');

    }

}
