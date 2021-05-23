const list = document.querySelector('.orderProducts__list');

db.collection('orders').get().then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
        const data = doc.data();
        console.log(doc.data());
        const product = document.createElement('a');
        product.innerHTML = `
        <div class="listProducts__list--product">
                <p class="listProducts__Name">${data.addres}</p>
                <p class="listProducts__Price" >$${data.ccnumber}</p>
        <div>
        `;
        product.classList.add('product');
        product.setAttribute('href','#');
        list.appendChild(product);

    });

});