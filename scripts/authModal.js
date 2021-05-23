const authModal = document.createElement('section');
authModal.classList.add('modal');
authModal.innerHTML = `

<div class="modal__backdrop"></div>
<article class="modal__content">
    <input class="modal__close" type="image" src="./imag/cancel.png">
    <form class="authform productForm__auth">
        <img class="productForm__auth--img" src="./imag/logo.png">

        <label class="autoform__regfield productForm__label productForm__label--auth">
        Nombre
        <input class="productForm__input productForm__input--auth" type="text" placeholder="Nombre" name="name">
        </label>
        <label class="productForm__label productForm__label--auth">
        Correo
        <input class="productForm__input productForm__input--auth" type="Email" placeholder="Email"
            name="email">
        </label>
    
        <label class="productForm__label productForm__label--auth">
        Contraseña
        <input class="productForm__input productForm__input--auth" type="password" placeholder="Contraseña" name="password">
        <p class="productForm__error"></p>

        </label>
        <button class="autoform__regbutton productForm__button button" type="submit">Regístrate</button>
        <button class="autoform__logbutton productForm__button button" type="submit">Iniciar Sesión</button>


        <p class="authform__register productForm__auth--text">¿No tiene una cuenta? <b><a class="productForm__auth--link">Regístrate</a></b></p>
        <p class="authform__login productForm__auth--text">¿Tiene una cuenta? <b><a class="productForm__auth--link">Inicia Sesión</a></b></p>
    </form>
</article>
`;

document.body.appendChild(authModal);

const autoForm = authModal.querySelector('.authform');
const regField = autoForm.querySelectorAll('.autoform__regfield');
const registerBttn = autoForm.querySelector('.authform__register');
const loginBttn = autoForm.querySelector('.authform__login');
const regBttn = autoForm.querySelector('.autoform__regbutton');
const logbutton = autoForm.querySelector('.autoform__logbutton');
const errorForm = autoForm.querySelector('.productForm__error');
let isLogin = true;
let nameUser;
const authModalContent = document.querySelector('.modal__content');
const modalClose = document.querySelector('.modal__close');



function handleGoToLogin() {

    regField.forEach((elem) => {
        elem.classList.add('hidden');
    });
    regBttn.classList.add('hidden');
    loginBttn.classList.add('hidden');
    registerBttn.classList.remove('hidden');
    logbutton.classList.remove('hidden');

    isLogin = true;

}

loginBttn.addEventListener('click', handleGoToLogin);


registerBttn.addEventListener('click', () => {

    regField.forEach((elem) => {
        elem.classList.remove('hidden');
    });
    regBttn.classList.remove('hidden');
    logbutton.classList.add('hidden');
    loginBttn.classList.remove('hidden');
    registerBttn.classList.add('hidden');
    isLogin = false;

});
handleGoToLogin();

autoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = autoForm.name.value;
    const email = autoForm.email.value;
    const password = autoForm.password.value;


    if (isLogin) {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                handleCloseModal();
            })
            .catch((error) => {
                console.log(error);
                errorForm.innerHTML = error;

            });

    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user);

                const userDoc = {
                    admi: false,
                    name,
                    email: email,
                    password: password,

                }

                db.collection('users').doc(user.uid).set(userDoc)
                setLoggedUser(userDoc, user.uid)
                handleCloseModal();

            })
            .catch((error) => {
                errorForm.innerHTML = error;


            });
    }

});


const authButtons = document.querySelectorAll('.authButtons');

authButtons.forEach((elem) => {
    elem.innerHTML = `
<a class="authButtons__logout hidden showLoggedIn" >Cerrar Sesión </a>
<a class="authButtons__login btn bnt-open-modal hidden showLogin"><img class="menu--icono" src="./imag/User.png">


`;

})

const authLogin = document.querySelectorAll('.authButtons__login');
const authLogOut = document.querySelectorAll('.authButtons__logout');

function handleModalAppear() {
    authModal.style.opacity = 1;
    authModalContent.style.transform = 'translate(0px, 0px)';
}

authLogin.forEach((elem) => {

    elem.addEventListener('click', () => {
        authModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(handleModalAppear, 1);
    })

})

function handleCloseModal() {
    authModal.style.opacity = 0;
    authModalContent.style.transform = 'translate(0px, -500px)';
    document.body.style.overflow = 'hidden scroll';
    setTimeout(function () {
        authModal.style.display = 'none';
    }, 500);
}

authLogOut.forEach((elem) => {

    elem.addEventListener('click', () => {

        firebase.auth().signOut();
    })

});



modalClose.addEventListener('click', handleCloseModal);

