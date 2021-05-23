const params = new URLSearchParams(location.search);
const id = params.get('id');
const nameForm = document.querySelector('.change__name');
const priceForm = document.querySelector('.change__price');
const productFormChange = document.querySelector('.productForm');
if (!id) {
    location.href = "./listProducts.html";
}


db.collection('products').doc(id).get().then((doc) => {

    const data = doc.data();
    if (!data) {
        //location.href = "./products.html";
    }
    nameForm.value = data.name;
    priceForm.value = data.price;
});

productFormChange.addEventListener('submit',(event)=>{
    event.preventDefault();
    db.collection('products').doc(id).update({
        price: parseFloat(priceForm.value),
        name: nameForm.value,

    }).then(()=>{
        console.log('se modifico');
        location.href = "./listProducts.html";
    });


})