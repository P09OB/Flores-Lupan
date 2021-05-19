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

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });