const list = document.querySelector('.listProducts__list');

db.collection('products').onSnapshot((querySnapshot) => {
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement('div');
        product.innerHTML = `
        <div class="listProducts__list--product">
                <img class="listProducts__img" src="${data.images[0]?.url || './imag/imgPlaceholder.jpeg'}">
                <p class="listProducts__Name"><b>Producto:</b> ${data.name}</p>
                <p class="listProducts__Price"><b>Precio:</b>  $${data.price}</p>
                <p class="listProducts__Categories"><b>Tipo:</b> ${data.type}</p>
                <div class="listProducts__btn">
                <a class="listProducts__edit" href="./editProduct.html?id=${doc.id}&name=${data.name}"> <img class="listProducts__edit--img"  src="./imag/edit.png"> </a>
                <input class="listProducts__delete" type="image" src="./imag/Xbluepng.png">
                </div>

        <div>
        `;


        const productDelete = product.querySelector('.listProducts__delete');

        productDelete.addEventListener('click', (event) => {
            console.log(doc.id);
            db.collection('products').doc(doc.id).delete();

        });

        list.appendChild(product);


    });

});

