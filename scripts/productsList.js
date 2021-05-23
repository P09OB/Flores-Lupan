const list = document.querySelector('.listProducts__list');

db.collection('products').onSnapshot((querySnapshot) => {
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement('div');
        product.innerHTML = `
        <div class="listProducts__list--product">
                <img class="listProducts__img" src="${data.images[0]?.url || './imag/imgPlaceholder.jpeg'}">
                <p class="listProducts__Name">${data.name}</p>
                <p class="listProducts__Price" >$${data.price}</p>
                <p class="listProducts__Categories">${data.type}</p>
                <p class="listProducts__Weather">${data.weather}</p>
                <p class="listProducts__Duration">${data.duration}</p>
                <p class="listProducts__Color">${data.color}</p>
                <a class="listProducts__edit" href="./editProduct.html?id=${doc.id}&name=${data.name}"<span>Estoy</span>>
                <button class="listProducts__delete">X</button>
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

