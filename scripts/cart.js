
const list = document.querySelector('.cartList');
const totalSpan = document.querySelector('.checkout__total span');
const checkForm = document.querySelector('.checkout__form');
let total = 0;

renderCart = () => {

    cart.forEach((data) => {
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
                <button class="">X</button>
        <div>
        `;
        product.classList.add('product');
        product.setAttribute('href', '#');
        list.appendChild(product);
        total += data.price;
    });
    totalSpan.innerText = total;

    checkForm.addEventListener('submit', (event)=>{
        event.preventDefault();

        const productIds = [];
        //ESCOGE CADA ID DE LOS PRODUCTOS QUE HAY EN EL CARRITO
        cart.forEach((data)=>{
            productIds.push(data.id);
        });

        const order ={
            ccnumber: checkForm.ccnumber.value,
            cinumber: checkForm.cinumber.value,
            addres: checkForm.addres.value,
            data: Date.now(),
            productIds,
            total,
            uid: loggedUser.uid,

        };

        orderCollection.add(order)
        .then((docRef)=>{
            CartCollection.doc(loggedUser.uid).set({
                cart:[],
              });
              location.href = './products.html'

        });

        console.log(order);

    });


}

