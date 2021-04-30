const list = document.querySelector('.listProducts__list');

db.collection('products').get().then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
        const data = doc.data();
        const product = document.createElement('a');
        product.innerHTML = `
        <div class="listProducts__list--product">
                <img class="listProducts__img" src="${data.images[0]?.url || './imag/imgPlaceholder.jpeg'}">
                <p class="listProducts__Name">${data.name}</p>
                <p class="listProducts__Price" >$${data.price}</p>
                <p class="listProducts__Categories">${data.type}</p>
                <p class="listProducts__Weather">${data.weather}</p>
                <p class="listProducts__Duration">${data.duration}</p>
                <p class="listProducts__Color">${data.color}</p>
        <div>
        `;
        product.classList.add('product');
        product.setAttribute('href','#');
        list.appendChild(product);
    });

})