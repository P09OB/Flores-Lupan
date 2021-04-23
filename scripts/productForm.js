const productsForm = document.querySelector('.productForm');
const productImg = document.querySelector('.productForm__img') 
const db = firebase.firestore();
const storage = firebase.storage();

productsForm.image.addEventListener('change',()=>{
    var reader = new FileReader();
    reader.onload = function(e){
        productImg.setAttribute('src',e.target.result);
    }
    reader.readAsDataURL(productsForm.image.files[0]);

})


productsForm.addEventListener('submit',(event) =>{
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
    }

    if(productsForm.occasion_anniversary.checked) product.occasion.push('anniversary');
    if(productsForm.occasion_birthday.checked) product.occasion.push('birthday');
    if(productsForm.occasion_condolences.checked) product.occasion.push('condolences');

    if(productsForm.color__pink.checked) product.color.push('pink');
    if(productsForm.color__blue.checked) product.color.push('blue');
    if(productsForm.color__green.checked) product.color.push('green');
    if(productsForm.color__fuchsia.checked) product.color.push('fuchsia');
    if(productsForm.color__red.checked) product.color.push('red');
    if(productsForm.color__orange.checked) product.color.push('orange');


    //if(!product.type) return;
    console.log(product);
    console.log(productsForm.color__pink.checked)

    const file = productsForm.image.files[0];
    var storageRef = firebase.storage().ref();
    var fileRef = storageRef.child(`images/${product.type}/${file.name}`);

    fileRef.put(file).then((snapshot) => {

        snapshot.ref.getDownloadURL().then((downloadURL) => {
            product.imageUrl = downloadURL;
            product.imageRef = snapshot.ref.fullPath;
            db.collection('products').add(product).then(()=>{
            
            })
        })

        
    });



    


    
    

});