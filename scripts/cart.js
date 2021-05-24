
const list = document.querySelector('.cartList');
const totalSpan = document.querySelector('.checkout__total span');
const totalFinalSpan = document.querySelector('.checkout__total--final span');

const checkForm = document.querySelector('.checkout__form');
const buttonHidden = document.querySelector('.checkout__boton');
const form = document.querySelector('.checkout__form');
let total = 0;
let totalFinal = 0;

buttonHidden.addEventListener('click',()=>{

    form.classList.remove('hidden')
    list.classList.add('hidden')
    buttonHidden.classList.add('hidden');
    console.log('entre');



});

renderCart = () => {

    if(cart.length < 0){
        list.innerText = "Tu Carrito de Compras está vacío :(";

    }

    cart.forEach((data) => {
        const product = document.createElement('div');
        product.innerHTML = `
        <div class="cartList__list">
                <img class="cartList__img" src="${data.images[0]?.url || './imag/imgPlaceholder.jpeg'}">
                <div class="cartList__details">
                <p class="">${data.type}</p>
                <p class="listProducts__Name">${data.name}</p>
                </div>
                <p class="listProducts__Price" >$${data.price}</p>
                
        <div>
        `;
        
        list.appendChild(product);
        total += data.price;




        /*const productDelete = product.querySelector('.delete');

        productDelete.addEventListener('click', (event) => {
            console.log(data.id);
            CartCollection.doc(loggedUser.uid).get().then((snapShot) =>{

                console.log(CartCollection.where('carth', 'array-contains',data.id));
                /*const data = snapShot.data();
                cart2 = data.cart;
                console.log(cart2);

                const index = cart2.findIndex(fruit => fruit === data.id);
                console.log(index);

                if(cart2.id === data.id){
                    cart2.splice(cart2.id);

                }
            });




        });*/


    });
    totalSpan.innerText = "$ "+total;
    totalFinal = total+5000;
    totalFinalSpan.innerText = "$ "+totalFinal;

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



