
const nav = document.querySelector('.menu');

nav.innerHTML=`
    <div class="menu__responsive">
            <img src="./imag/menu.png" id="button" class="menu__button">
            <img class="menu__logo--size" src="./imag/logo-41w.png">
            <div class="menu__icono--responsive">
                <a><img class="menu--icono" src="./imag/ShoppingCart.png"></a>
                <a><img class="menu--icono" src="./imag/User.png"></a>
            </div>

        </div>

        <a class="menu__element menu__desaparecer" href="./index.html">Inicio</a>
        <a class="menu__element menu__desaparecer" href="./products.html">Flores</a>
        <a class="menu__element menu__desaparecer">Ramos</a>
        <a class="menu__logo"> <img src="./imag/logo.png"></a>
        <a class="menu__element menu__desaparecer">Galería</a>
        <a class="menu__element menu__desaparecer"> Contáctenos</a>
        <div class="menu__icono">
            <a class="cartBtn" href="./cart.html" ><img class=" menu--icono" src="./imag/ShoppingCart.png"><span></span>
            </a>
            <section class="authButtons"></section>
            </a>
            <div class="showLoggedAdmi hidden"></div>

        </div>
`;

const button = document.getElementById('button');

function span(number){
    const cartNumber = document.querySelector('.cartBtn span');
    cartNumber.innerText = number;
    console.log(cartNumber);

}

button.addEventListener('click', () => {

    const ancla = document.getElementsByClassName('menu__element');
    for (var i = 0; i < ancla.length; i++) {

        ancla[i].classList.toggle('menu__desaparecer');

    }

})