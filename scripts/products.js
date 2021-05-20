const filter = document.querySelector('.filter');
const filterButton = document.getElementById('filtro');
const list = document.querySelector('.list');
const checkbox = document.querySelector('.c-checkbox')
const check = document.querySelector('.c-check');
const select = document.querySelector('.categories__all');
const conventional = document.querySelector('.conventional');
const exclusive = document.querySelector('.exclusive');
const exotic = document.querySelector('.exotic');
const foliage = document.querySelector('.foliage');
const all = document.querySelector('.all');
const cold = document.querySelector('.cold');
const hot = document.querySelector('.hot');


var clic = 1;
var clic1 = 1;
var clic2 = 1;
let weatherCold = false;
let weatherHot = false;

console.log(loggedUser)


const handleCollectionResult = (querySnapshot) => {
    list.innerHTML = '';

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement('div');
        product.innerHTML = `
        <a class="product" href="./infoProduct.html?id=${doc.id}&name=${data.name}">
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
        </a>
        `;
        
        list.appendChild(product);
    });
};

filter.addEventListener('change', function () {
    console.log(filter.color);

    const arrayColor = [];
    const arrayOccasion = [];

    filter.color.forEach((checkbox)=>{
        if(checkbox.checked) {
            arrayColor.push(checkbox.getAttribute('data-type'));
          }
    });

    let productCollection = db.collection('products');

    if(arrayColor.length > 0){
        
        productCollection = productCollection.where('color', 'in', arrayColor);
    }

    if(filter.occasion.value){
        if(filter.occasion.value === ''){
            productCollection = productCollection.where('occasion', '==','');
        } else{
            productCollection = productCollection.where('occasion', 'array-contains',filter.occasion.value);
        }
    }


    if (filter.order.value) {

        switch (filter.order.value) {
            case 'price_asc':
                productCollection = productCollection.orderBy('price', 'asc');
                break;
            case 'price_des':
                productCollection = productCollection.orderBy('price', 'desc');
                break;
            case 'duration_asc':
                productCollection = productCollection.orderBy('duration', 'asc');
                break;
            case 'duration_des':
                productCollection = productCollection.orderBy('duration', 'desc');
                break;
            case 'score_asc':
                productCollection = productCollection.orderBy('score', 'asc');
                break;
            case 'score_des':
                productCollection = productCollection.orderBy('score', 'desc');
                break;

        }

    }

    productCollection.get().then(handleCollectionResult);


});





cold.addEventListener('click',()=>{

    if (clic1 == 1) {
    filterType('weather','cold');
    weatherCold = true;
    clic1 = clic1 + 1;
    } else {
         weatherCold = false;
         if(!weatherCold && !weatherHot) filterType('weather','');

         clic1 = 1;

    }
});
hot.addEventListener('click',()=>{
    if (clic2 == 1) {
    filterType('weather','hot');
    weatherHot = true;
    clic2 = clic2 + 1;
} else {
    weatherHot = false;
    if(!weatherCold && !weatherHot) filterType('weather','');

    clic2 = 1;

}
});
conventional.addEventListener('click', () => {
    filterType('type', 'conventional');
});
exclusive.addEventListener('click', () => {
    filterType('type', 'exclusive');

});
exotic.addEventListener('click', () => {
    filterType('type', 'exotic');
});
foliage.addEventListener('click', () => {
    filterType('type', 'foliage');
});
all.addEventListener('click', () => {
    filterType('type', '');
});

function filterType(search, type) {

    let productCollection = db.collection('products');

    if (type) productCollection = productCollection.where(search, '==', type)
    productCollection.get().then(handleCollectionResult)

}

db.collection('products').get().then(handleCollectionResult)



filterButton.addEventListener('click', () => {

    if (clic == 1) {
        document.querySelector('.filter__opcions').style.display = 'none';
        clic = clic + 1;

    } else {
        document.querySelector('.filter__opcions').style.display = 'flex';
        document.querySelector('.filter__opcions').style.flexWrap = 'wrap';
        clic = 1;

    }

});

checkbox.addEventListener('click', (ev) => {
    if (ev.target.tagName === 'SPAN') {
        ev.target.classList.toggle('c-checkbox__done');
    }
    if (ev.target.tagName === 'INPUT') {
        ev.target.classList.toggle('c-checkbox__done');
    }
}, false);

check.addEventListener('click', (e) => {
    console.log(e.target.tagName);
    if (e.target.tagName === 'INPUT') {
        e.target.classList.toggle('c-checkbox__done--weather');
    }
    if (e.target.tagName === 'SPAN') {
        e.target.classList.toggle('c-checkbox__done--weather');
    }
}, false);

