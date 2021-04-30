const productsForm = document.querySelector('.productForm');
const productFormAdd = document.querySelector('.productForm__addAd');
const productFormLoad = document.querySelector('.productForm__load');
const productImages = document.querySelector('.productForm__images');
const imageFiles = [];

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

    const product = {
        name: productsForm.name.value,
        price: parseFloat(productsForm.price.value),
        type: productsForm.type.value,
        weather: productsForm.weather.value,
        occasion: [],
        duration: productsForm.duration.value,
        color: [],
        description: productsForm.description.value,
        score: 0,
    }

    if (productsForm.occasion_anniversary.checked) product.occasion.push('anniversary');
    if (productsForm.occasion_birthday.checked) product.occasion.push('birthday');
    if (productsForm.occasion_condolences.checked) product.occasion.push('condolences');

    if (productsForm.color__pink.checked) product.color.push('pink');
    if (productsForm.color__blue.checked) product.color.push('blue');
    if (productsForm.color__green.checked) product.color.push('green');
    if (productsForm.color__fuchsia.checked) product.color.push('fuchsia');
    if (productsForm.color__red.checked) product.color.push('red');
    if (productsForm.color__orange.checked) product.color.push('orange');

    console.log(product);
    console.log(productsForm.color__pink.checked)

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
                })

            });
        });
    });

});