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
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection('users').doc(user.uid).get().then((doc)=>{
        loggedUser = doc.data();
        loggedUser.uid = user.uid;
        

        userAuthChanged(true);

      })
      // ...
    } else {
      loggedUser = null;
      console.log("cerrar sesion");

      userAuthChanged(false);
    }
  });