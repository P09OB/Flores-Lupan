const button = document.getElementById('button');


action = ()=> {

    
    

}

button.addEventListener('click', ()=>{

    const ancla = document.getElementsByClassName('menu__element');
    for(var i = 0; i < ancla.length; i++){

        ancla[i].classList.toggle('menu__desaparecer');

    }

})
