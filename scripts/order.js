const list = document.querySelector('.orderProducts__list');

db.collection('orders').get().then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
        const data = doc.data();
        console.log(doc.data());
        const product = document.createElement('div');
        product.innerHTML = `
        <div class="listProducts__list--product">
                <p class="listProducts__Name">${data.addres}</p>
                <p class="listProducts__Price" >$${data.ccnumber}</p>
        <div>
        `;
        const listOrder = document.createElement('div');
        console.log(data.productIds)
        list.appendChild(product);

    });

});