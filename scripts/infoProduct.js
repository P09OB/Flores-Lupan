const params = new URLSearchParams(location.search);
const id = params.get('id');
const checkbox = document.querySelector('.c-checkbox');


if (!id) {
    location.href = "./products.html";
}

const productImg = document.querySelector('.details__img--big');
const productImg1 = document.querySelector('.details__img1');
const productImg2 = document.querySelector('.details__img2');
const productImg3 = document.querySelector('.details__img3');
const productTitle = document.querySelector('.details__text--title');
const productScore = document.querySelector('.details__text--score');
const productPrice = document.querySelector('.details__text--price');
const colorYellow = document.querySelector('.c-checkbox__fake--yellow');
const colorPurple = document.querySelector('.c-checkbox__fake--purple');
const colorGreen = document.querySelector('.c-checkbox__fake--green');
const colorFuchsia = document.querySelector('.c-checkbox__fake--fuchsia');
const colorRed = document.querySelector('.c-checkbox__fake--red');
const colorOrange = document.querySelector('.c-checkbox__fake--orange');
const colorWhite = document.querySelector('.c-checkbox__fake--white');
const colorNude = document.querySelector('.c-checkbox__fake--nude');
const weatherCold = document.querySelector('.details__weather--cold');
const weatherHot = document.querySelector('.details__weather--hot');
const productDuration = document.querySelector('.details__duration--days');
const formDetails =document.querySelector('.details__form');
const addButton = document.querySelector('.details__addCart');
const listFeatured = document.querySelector('.featuredProducts__list');
const productDescripction = document.querySelector('.details__text--description');


;

db.collection('products').doc(id).get().then((doc) => {

    const data = doc.data();
    if (!data) {
        //location.href = "./products.html";
    }

    productImg.setAttribute("src", data.images[0].url);
    productImg1.setAttribute("src", data.images[1].url);
    productImg2.setAttribute("src", data.images[2].url);
    productImg3.setAttribute("src", data.images[3].url);

    productTitle.innerHTML = data.name;
    productScore.innerHTML = data.score;
    productPrice.innerHTML = `$${data.price} `;
    productDescripction.innerHTML = data.description;
    productDuration.innerHTML = `${data.duration}`;

    productImg1.addEventListener('mouseover', () => {
        productImg.setAttribute("src", data.images[1].url);

    });

    productImg2.addEventListener('mouseover', () => {
        productImg.setAttribute("src", data.images[2].url);


    });

    productImg3.addEventListener('mouseover', () => {
        productImg.setAttribute("src", data.images[3].url);


    });

    switch (data.weather) {

        case 'cold':
            remove(weatherCold)
            break;
        case 'hot':
            remove(weatherHot)
            break;

    }

    console.log(data.color);

    for (let i = 0; i < data.color.length; i++) {
        if (data.color[i] === 'yellow') remove(colorYellow);
        if (data.color[i] === 'purple') remove(colorPurple);
        if (data.color[i] === 'green') remove(colorGreen);
        if (data.color[i] === 'fuchsia') remove(colorFuchsia);
        if (data.color[i] === 'red') remove(colorRed);
        if (data.color[i] === 'orange') remove(colorOrange);
        if (data.color[i] === 'white') remove(colorWhite);
        if (data.color[i] === 'nude') remove(colorNude);
    };

    formDetails.addEventListener('submit',(event)=>{
        event.preventDefault();

        const color = [];
        
        if(loggedUser){
        if (formDetails.color__yellow.checked) color.push("yellow");
        if (formDetails.color__purple.checked) color.push("purple");
        if (formDetails.color__green.checked) color.push("green");
        if (formDetails.color__fuchsia.checked) color.push("fuchsia");
        if (formDetails.color__red.checked) color.push("red");
        if (formDetails.color__orange.checked) color.push("orange");
        if (formDetails.color__white.checked) color.push("white");
        if (formDetails.color__nude.checked) color.push("nude");
    
            addToMyCart({
                ...data,
                id:doc.id,
                amount:formDetails.amount.value,
                color:color,
                total: data.price*formDetails.amount.value,
            });

            
    
        } else{
            authModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            setTimeout(handleModalAppear, 1);
        }
    
    })

});

const resultFeatured = (querySnapshot) => {
    listFeatured.innerHTML = '';

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement('div');
        product.innerHTML = `
        <a class="product" href="./infoProduct.html?id=${doc.id}&name=${data.name}">
        <div class="featuredProducts__product">
        <img class="featuredProducts__img" src="${data.images[0]?.url || './imag/imgPlaceholder.jpeg'}">   
        <div class="featuredProducts__info">
            <div class="featuredProducts__text">
                <p class="featuredProducts__name">${data.name}</p>
                <p class="featuredProducts__price">$${data.price}</p>
            </div>
        </div>
        </a>
        <input class="featuredProducts__cartBtn featuredProducts__icono authButtons__login" type="image" src="./imag/addCart.png">

        </div>
        `;
        
        listFeatured.appendChild(product);

        /*const cartBtn = product.querySelector('.list__cartBtn ');
            cartBtn.addEventListener('click',()=>{

                if(loggedUser){

                    addToMyCart({
                        ...data,
                        id:doc.id,
                        amount:1,
                        color:[],
                        total: data.price,
                    });

                } else{
                    authModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    setTimeout(handleModalAppear, 1);
                }
            
                

            });*/
        
            /*localStorage.setItem('store__cart',JSON.stringify(cart));
            span(cart.length);*/
    });
    
};

let productCollection = db.collection('products');
productCollection = productCollection.where("score", ">", 9).orderBy("score").limit(4);
productCollection.get().then(resultFeatured);

function remove(color) {
    color.classList.remove('hidden');
}

checkbox.addEventListener('click', (ev) => {
    if (ev.target.tagName === 'SPAN') {
        ev.target.classList.toggle('c-checkbox__done');
    }
    if (ev.target.tagName === 'INPUT') {
        ev.target.classList.toggle('c-checkbox__done');
    }
}, false);


