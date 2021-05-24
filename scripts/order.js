const list = document.querySelector('.orderProducts__list');

db.collection('orders').get().then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
        const data = doc.data();
        console.log(doc.data());
        const product = document.createElement('div');
        product.innerHTML = `
        <div class="listProducts__list--product">
        <div>
                <p class="listProducts__date">${new Date(data.data).toDateString()}</p>
                <p class="listProducts__Name"><b>Dirección:</b> ${data.addres}</p>
        </div>
                <p class="listProducts__Price"><b>Total:</b>  $${data.total}</p>
        <div>
        `;
        const listOrder = document.createElement('div');
        console.log(data.productIds)
        list.appendChild(product);

    });
    
});