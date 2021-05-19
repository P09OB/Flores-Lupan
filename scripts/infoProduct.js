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




const productDescripction = document.querySelector('.details__text--description');



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

    for (let i = 0; i < 7; i++) {
        if (data.color[i] === 'yellow') remove(colorYellow);
        if (data.color[i] === 'purple') remove(colorPurple);
        if (data.color[i] === 'green') remove(colorGreen);
        if (data.color[i] === 'fuchsia') remove(colorFuchsia);
        if (data.color[i] === 'red') remove(colorRed);
        if (data.color[i] === 'orange') remove(colorOrange);
        if (data.color[i] === 'white') remove(colorWhite);
        if (data.color[i] === 'nude') remove(colorNude);
    };

});

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
