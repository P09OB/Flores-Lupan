const button = document.getElementById('button');
const filterButton = document.getElementById('filtro');
const list = document.querySelector('.list');

var clic = 1;

db.collection('products').get().then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
        const data = doc.data();
        const product = document.createElement('a');
        product.innerHTML = `
        <div class="list__product">
        <img class="list__img" src="${data.images[0]?.url || './imag/imgPlaceholder.jpeg'}">
        <div class="list__info">
            <div class="list__text">
                <p class="list__name">${data.name}</p>
                <p class="list__price">$${data.price}</p>
            </div>
                <input class="list__icono" type="image" src="./imag/addCart.png">
        </div>
        </div>
        
        `;
        product.classList.add('product');
        product.setAttribute('href','#');

        list.appendChild(product);
    });

})

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