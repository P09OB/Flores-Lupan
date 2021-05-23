const firebaseConfig = {
  apiKey: "AIzaSyCWgy2tCdcWUWuq2kCD7Iahwm8klwpqZHM",
  authDomain: "lupan-4ba70.firebaseapp.com",
  projectId: "lupan-4ba70",
  storageBucket: "lupan-4ba70.appspot.com",
  messagingSenderId: "435256614744",
  appId: "1:435256614744:web:1b9e40f339cf09f67d4f2d"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
let loggedUser = null;

const setLoggedUser = (info, id) => {
  loggedUser = info;
  loggedUser.uid = id;
  userAuthChanged(true);
  if (typeof checkProductFormAdmin !== 'undefined') checkProductFormAdmin();


}
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then((doc) => {
      if (!doc.data()) return;
      const data = doc.data();
    
      setLoggedUser(doc.data(), user.uid);


    });
    getMyCart(user.uid);
  } else {
    loggedUser = null;
    cart = [];
    span(cart.length);
    userAuthChanged(false);

  }
});

let cart = [];

//FIREBASE 
const CartCollection = db.collection('cart');
const orderCollection = db.collection('orders');

const addToMyCart = (product) => {

  
    cart.push(product);
    CartCollection.doc(loggedUser.uid).set({
      cart: cart,
    });
    span(cart.length);

}

let renderCart = null;

const getMyCart = (uid) => {

  CartCollection.doc(uid).get().then((snapShot) => {
    const data = snapShot.data();
    if (!data) return;
    span(data.cart.length);
    cart = data.cart;


    if (renderCart) renderCart();


  });

}


/*
const cartFromLS = localStorage.getItem('store__cart');

if(cartFromLS){
    cart = JSON.parse(cartFromLS);
    span(cart.length);

}*/