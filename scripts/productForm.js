const productsForm = document.querySelector('.productForm');
const productFormAdd = document.querySelector('.productForm__addAd');
const productFormLoad = document.querySelector('.productForm__load');
const productImages = document.querySelector('.productForm__images');
const checkbox__fake = document.querySelector('.c-checkbox');
const productFormError = document.querySelector('.productForm__wrong');
const productFormErrorText = document.querySelector('.productForm__wrong--text');
let imageFiles = [];
var numScore;

function getRandomArbitrary(min, max) {
    numScore =  Math.random() * (max - min) + min;
  }


productsForm.image.addEventListener('change', () => {
    const file = productsForm.image.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
        const productImg = document.createElement('img');
        productImg.classList.add('productForm__img');
        productImg.setAttribute('src', e.target.result);
        productImages.appendChild(productImg);
    }
    reader.readAsDataURL(file);
    imageFiles.push(file);

});

productsForm.addEventListener('submit', (event) => {

    event.preventDefault();
    getRandomArbitrary(0, 10)
    console.log(numScore);
    var score = numScore.toFixed(2);
    
    const product = {
        name: productsForm.name.value,
        price: parseFloat(productsForm.price.value),
        type: productsForm.type.value,
        weather: productsForm.weather.value,
        occasion:[],
        duration: parseFloat(productsForm.duration.value),
        color:[],
        description: productsForm.description.value,
        score: parseFloat(score),
    }

    if (productsForm.occasion_anniversary.checked) product.occasion.push('anniversary');
    if (productsForm.occasion_birthday.checked) product.occasion.push('birthday');
    if (productsForm.occasion_condolences.checked) product.occasion.push('condolences');

    if (productsForm.color__yellow.checked) product.color.push("yellow");
    if (productsForm.color__purple.checked) product.color.push("purple");
    if (productsForm.color__green.checked) product.color.push("green");
    if (productsForm.color__fuchsia.checked) product.color.push("fuchsia");
    if (productsForm.color__red.checked) product.color.push("red");
    if (productsForm.color__orange.checked) product.color.push("orange");
    if (productsForm.color__white.checked) product.color.push("white");
    if (productsForm.color__nude.checked) product.color.push("nude");


    let error = '';
    if (!product.name) {
        error += "Falta el nombre del producto. <br/>";
    }
    if (!product.price) {
        error += "Indique el precio del producto. <br/>";
    }
    if (!product.type) {
        error += "Indique el tipo de producto. <br/>";
    }
    if (!product.weather) {
        error += "Indique el clima ideal para el producto. <br/>";
    }
    if (!product.occasion) {
        error += "Indique una ocasión. <br/>";
    }
    if (!product.description) {
        error += "Agrege una descripción. <br/>";
    }
    if (!product.duration) {
        error += "Indique la duración del producto <br/>";
    }
    if (product.duration > 31) {
        error += "La duración del producto no puede ser mayor a 31 días <br/>";
    }
    if (product.color.length === 0) {
        error += "Seleccione un color. <br/>";
    }
    if(imageFiles.length <= 3){
        error += "Agrege cuatro imagenes como minimo. <br/>";
    }
    if (error) {
        productFormErrorText.innerHTML = error;
        productFormError.classList.remove('hidden');
        return;
    } else {
        productFormError.classList.add('hidden');
    }

    productFormLoad.classList.remove('hidden');
    productFormError.classList.add('hidden');

    const genericCatch = function (error) {
        productFormLoad.classList.add('hidden');
        productFormError.classList.remove('hidden');
        productFormError.innerHTML = 'There was an error in the product upload.';
    }

    db.collection('products').add(product).then((docRef) => {
        const uploadPromises = [];
        const downloadUrlPromises = [];

        productFormLoad.classList.remove('hidden');

        imageFiles.forEach((file) => {

            var storageRef = firebase.storage().ref();
            var fileRef = storageRef.child(`products/${docRef.id}/${file.name}`);

            uploadPromises.push(fileRef.put(file));

        });
        Promise.all(uploadPromises).then((snapshots) => {
            snapshots.forEach((snapshot) => {
                downloadUrlPromises.push(snapshot.ref.getDownloadURL());

            });

            Promise.all(downloadUrlPromises).then((downloadURLs) => {
                const images = [];
                downloadURLs.forEach((url, index) => {

                    images.push({
                        url: url,
                        ref: snapshots[index].ref.fullPath
                    });
                });
                db.collection('products').doc(docRef.id).update({
                    images: images
                }).then(() => {
                    //MENSAJE DE QUE YA TERMINO
                    productFormLoad.classList.add('hidden');
                    productFormAdd.classList.remove('hidden');
                    setTimeout(adAppear, 2000);
                    productFormErrorText.innerHTML = '';
                    document.getElementById("name").value = "";
                    document.getElementById("price").value = "";
                    document.getElementById("duration").value = "";
                    document.getElementById('description').value = "";
                    productImages.innerHTML='';
                    imageFiles=[];

                })
                .catch(genericCatch);
            })
                .catch(genericCatch);
        })
            .catch(genericCatch);
    })
        .catch(genericCatch);
        
});

function adAppear(){
    productFormAdd.classList.add('hidden');

}

checkbox__fake.addEventListener('click', (ev) => {
    if (ev.target.tagName === 'SPAN') {
        ev.target.classList.toggle('c-checkbox__done');
    }
}, false);

const checkProductFormAdmin = ()=>{

    if(!loggedUser || !loggedUser.admin){
        location.href = './products.html';
    }
}