const button = document.getElementById('button');
const filterButton = document.getElementById('filtro');
var clic = 1;

button.addEventListener('click', () => {

    const ancla = document.getElementsByClassName('menu__element');
    for (var i = 0; i < ancla.length; i++) {

        ancla[i].classList.toggle('menu__desaparecer');

    }

})

filterButton.addEventListener('click', () => {

    if(clic==1){
        document.querySelector('.filter__opcions').style.display = 'none';
        clic= clic + 1;

    } else{
        document.querySelector('.filter__opcions').style.display = 'flex';
        document.querySelector('.filter__opcions').style.flexWrap = 'wrap';
        clic = 1;

    }


})