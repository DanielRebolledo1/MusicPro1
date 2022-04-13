const body = document.body;

if (body.classList.contains('home')) {
    console.log('home')

    const subsForm = document.getElementById('subs-form')
    const subsEmail = document.getElementById('subs-email')

    const categoryShowIcon1 = document.getElementById('show-icon-1');
    const categoryShowIcon2 = document.getElementById('show-icon-2');
    const categoryShowIcon3 = document.getElementById('show-icon-3');

    subsForm.addEventListener('submit', (e) => {
        if(!checkSubsInputsOnSubmit(subsEmail)){
            e.preventDefault();
        }
    });

    subsEmail.addEventListener('focusout', () => {
        checkEmailOnFocusOut(subsEmail);
    });

    subsEmail.addEventListener('input', () => {
        resetInput(subsEmail);
    });

    //Carousels configuration (Swiper)
    const swiper1 = new Swiper('.swiper1', {
        // Optional parameters
        direction: 'horizontal',
        rewind: true,
        speed: 1000,

        // Autoplay
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        // If we need pagination
        pagination: {
            el: '.swiper-pagination1',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    const swiper2 = new Swiper('.swiper2', {
        grabCursor: true,
        clickable: false,
        slidesPerView: 1,
        speed: 500,
        autoHeight: true,
        // Optional parameters
        direction: 'horizontal',

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        scrollbar: {
            el: ".swiper-scrollbar",
            hide: true,
        },

        breakpoints: {
            // when window width is >= 1400px
            1400: {
                slidesPerView: 6,
                slidesPerGroup: 6,
            },
            1200: {
                slidesPerView: 5,
                slidesPerGroup: 5,
            },
            900: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            620: {
                slidesPerView: 2.25,
                slidesPerGroup: 2,
            },
            560: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            500: {
                slidesPerView: 1.75,
                slidesPerGroup: 1,
            },
            430: {
                slidesPerView: 1.5,
                slidesPerGroup: 1,
            },
            360: {
                slidesPerView: 1.25,
                slidesPerGroup: 1,
            },
        }
    });
    const swiper3 = new Swiper('.swiper3', {
        grabCursor: true,
        clickable: false,
        slidesPerView: 1,
        speed: 500,
        autoHeight: true,
        // Optional parameters
        direction: 'horizontal',

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        scrollbar: {
            el: ".swiper-scrollbar",
            hide: true,
        },

        breakpoints: {
            // when window width is >= 1400px
            1400: {
                slidesPerView: 6,
                slidesPerGroup: 6,
            },
            1200: {
                slidesPerView: 5,
                slidesPerGroup: 5,
            },
            900: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            620: {
                slidesPerView: 2.25,
                slidesPerGroup: 2,
            },
            560: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            500: {
                slidesPerView: 1.75,
                slidesPerGroup: 1,
            },
            430: {
                slidesPerView: 1.5,
                slidesPerGroup: 1,
            },
            360: {
                slidesPerView: 1.25,
                slidesPerGroup: 1,
            },
        }
    });

    //JQuery functions
    $(document).on('click', '#sidebar-open-btn', function() {

        $('#sidebar-container').show();
        $('#sidebar').show("slide", 300);
        $('body').css('overflow', 'hidden');
        $('#sidebar').css('overflow', 'auto');
    });

    $(document).on('click', '#sidebar-close-btn', function() {
        $('#sidebar-container').hide("fade", 300);
        $('#sidebar').hide("slide", 300);
        $('body').css('overflow', 'auto');

        if (categoryShowIcon1.classList.contains('hide')){
            toggleCategoryShow($('#category-1-sub'), categoryShowIcon1);
        }

        if (categoryShowIcon2.classList.contains('hide')){
            toggleCategoryShow($('#category-2-sub'), categoryShowIcon2);
        }

        if (categoryShowIcon3.classList.contains('hide')){
            toggleCategoryShow($('#category-3-sub'), categoryShowIcon3);
        }
    });

    $(document).on('click', '#sidebar-bg', function() {
        $('#sidebar-close-btn').click();
    });

    $(document).on('click', '#category-1-btn', function() {
        toggleCategoryShow($('#category-1-sub'), categoryShowIcon1);
    });

    $(document).on('click', '#category-2-btn', function() {
        toggleCategoryShow($('#category-2-sub'), categoryShowIcon2);
    });

    $(document).on('click', '#category-3-btn', function() {
        toggleCategoryShow($('#category-3-sub'), categoryShowIcon3);
    });
}

if (body.classList.contains('login-register')){
    console.log('login/register')

    const loginForm = document.getElementById('login-form')
    const loginEmail = document.getElementById('login-email')
    const loginPassword = document.getElementById('login-pw')
    const registerForm = document.getElementById('register-form')
    const registerName = document.getElementById('register-name')
    const registerLastName = document.getElementById('register-lastname')
    const registerEmail = document.getElementById('register-email')
    const registerPassword = document.getElementById('register-pw')
    const forgotPasswordForm = document.getElementById('forgot-pw-form')
    const forgotPasswordEmail = document.getElementById('forgot-pw-email')
    const loginPasswordToggleBtn = document.getElementById('login-sh-btn')
    const registerPasswordToggleBtn = document.getElementById('register-sh-btn')

    loginForm.addEventListener('submit', (e) => {
        if(!checkLoginInputsOnSubmit(loginEmail, loginPassword)){
            e.preventDefault();
        }
    });

    forgotPasswordForm.addEventListener('submit', (e) => {
        if(!checkForgotPasswordInputsOnSubmit(forgotPasswordEmail)){
            e.preventDefault();
        }
    });

    loginEmail.addEventListener('focusout', () => {
        checkEmailOnFocusOut(loginEmail);
    });

    loginEmail.addEventListener('input', () => {
        resetInput(loginEmail);
    });

    loginPassword.addEventListener('input', () => {
        resetInput(loginPassword);
    });

    forgotPasswordEmail.addEventListener('focusout', () => {
        checkEmailOnFocusOut(forgotPasswordEmail);
    });

    forgotPasswordEmail.addEventListener('input', () => {
        resetInput(forgotPasswordEmail);
    });

    registerForm.addEventListener('submit', (e) => {
        if(!checkRegisterInputsOnSubmit(registerEmail, registerPassword, registerName, registerLastName)){
            e.preventDefault();
        }
    });

    registerEmail.addEventListener('focusout', () => {
        checkEmailOnFocusOut(registerEmail);
    });

    registerEmail.addEventListener('input', () => {
        resetInput(registerEmail);
    });

    registerName.addEventListener('input', () => {
        resetInput(registerName);
    });

    registerLastName.addEventListener('input', () => {
        resetInput(registerLastName);
    });

    registerPassword.addEventListener('input', () => {
        resetInput(registerPassword);
    });

    loginPasswordToggleBtn.addEventListener('click', () => {
        togglePasswordView(loginPassword, loginPasswordToggleBtn);
    });

    registerPasswordToggleBtn.addEventListener('click', () => {
        togglePasswordView(registerPassword, registerPasswordToggleBtn);
    });

    //JQuery functions
    jQuery(document).on('click', '#forgot-pw-btn', function() {
        jQuery('#login-register-tabs, #forgot-pw-tab').toggle();
        resetInput(loginEmail);
        resetInput(loginPassword);
    });

    jQuery(document).on('click', '#forgot-pw-back-btn', function() {
        jQuery('#login-register-tabs, #forgot-pw-tab').toggle();
        resetInput(forgotPasswordEmail);
    });

    jQuery(document).on('click', '#register-shortcut-btn', function() {
        const registerTab = document.getElementById('pills-register-tab');
        registerTab.click();
    });
}

//Validaciones de formularios

function checkLoginInputsOnSubmit(loginEmail, loginPassword) {
    //get values from the inputs
    const emailValue = loginEmail.value.trim();
    const passwordValue = loginPassword.value.trim();

    if(emailValue === '') {
        //add error class
        setErrorFor(loginEmail, 'Por favor ingrese un email');
    } else if(!isEmail(emailValue)) {
            setErrorFor(loginEmail, 'Por favor ingrese un email válido');
    } else {
        //add success class
        setSuccessFor(loginEmail);
    }

    if(passwordValue === '') {
        setErrorFor(loginPassword, 'Por favor ingrese su contraseña');
    } else {
        setSuccessFor(loginPassword);
    }

    return checkSuccess(loginEmail) && checkSuccess(loginPassword);
}

function checkForgotPasswordInputsOnSubmit(forgotPasswordEmail) {
    //get values from the inputs
    const emailValue = forgotPasswordEmail.value.trim();

    if(emailValue === '') {
        //add error class
        setErrorFor(forgotPasswordEmail, 'Por favor ingrese un email');
    } else if(!isEmail(emailValue)) {
        setErrorFor(forgotPasswordEmail, 'Por favor ingrese un email válido');
    } else {
        //add success class
        setSuccessFor(forgotPasswordEmail);
    }

    return checkSuccess(forgotPasswordEmail);
}

function checkRegisterInputsOnSubmit(registerEmail, registerPassword, registerName, registerLastName) {
    //get values from the inputs
    const emailValue = registerEmail.value.trim();
    const passwordValue = registerPassword.value.trim();
    const nameValue = registerName.value.trim();
    const lastNameValue = registerLastName.value.trim();

    if(emailValue === '') {
        //add error class
        setErrorFor(registerEmail, 'Por favor ingrese un email');
    } else if(!isEmail(emailValue)) {
        setErrorFor(registerEmail, 'Por favor ingrese un email válido');
    } else {
        //add success class
        setSuccessFor(registerEmail);
    }

    if(passwordValue === '') {
        setErrorFor(registerPassword, 'Por favor ingrese una contraseña');
    } else {
        setSuccessFor(registerPassword);
    }

    if(nameValue === '') {
        setErrorFor(registerName, 'Por favor ingrese su nombre');
    } else {
        setSuccessFor(registerName);
    }

    if(lastNameValue === '') {
        setErrorFor(registerLastName, 'Por favor ingrese su apellido');
    } else {
        setSuccessFor(registerLastName);
    }

    return checkSuccess(registerEmail) && checkSuccess(registerPassword) && checkSuccess(registerName) && checkSuccess(registerLastName) ;
}

function checkSubsInputsOnSubmit(subsEmail) {
    //get values from the inputs
    const emailValue = subsEmail.value.trim();

    if(emailValue === '') {
        //add error class
        setErrorFor(subsEmail, 'Por favor ingrese un email');
    } else if(!isEmail(emailValue)) {
        setErrorFor(subsEmail, 'Por favor ingrese un email válido');
    } else {
        //add success class
        setSuccessFor(subsEmail);
    }

    return checkSuccess(subsEmail);
}

function checkEmailOnFocusOut(email) {
    const emailValue = email.value.trim();

    if(!isEmail(emailValue) && emailValue!=='') {
        setErrorFor(email, 'Por favor ingrese un email válido');
    }
}

function setErrorFor(input, message) {
    const formOutline = input.parentElement;
    const errorMessage = formOutline.querySelector('div.invalid-feedback')

    //add error message inside container
    errorMessage.innerText = message;

    //add error class
    formOutline.className = 'form-outline error';

    input.classList.remove('is-invalid');
    input.classList.add('is-invalid');
}

function setSuccessFor(input) {
    const formOutline = input.parentElement;
    formOutline.className = 'form-outline success';

    input.classList.remove('is-invalid');
}

function resetInput(input) {
    const formOutline = input.parentElement;
    formOutline.className = 'form-outline';

    input.classList.remove('is-invalid');
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function checkSuccess(input){
    const formOutline = input.parentElement;
    return formOutline.classList.contains('success');
}

//Ver contrasena/ocultar

function togglePasswordView(password, button){
    if (password.type === 'password'){
        password.type = 'text';
        button.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    } else {
        password.type = 'password';
        button.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }
}

//Ver subcategorias/ocultar

function toggleCategoryShow(category, icon){
    category.slideToggle(300);

    if (icon.classList.contains('hide')){
        icon.classList.remove('hide');
        icon.classList.add('show');
    } else {
        icon.classList.remove('show');
        icon.classList.add('hide');
    }
}

if (body.classList.contains('home-contacto')){
    console.log('home-contacto') 
    const contactoForm = document.getElementById('contacto-form')
    const contactoSelect = document.getSelection('contacto-select')
    const contactoEmail = document.getElementById('contacto-email')
    const contactoMensaje = document.getElementById('contacto-mensaje')


    contactoForm.addEventListener('submit', (e) => {
        if(!checkContactoInputsOnSubmit(contactoEmail, contactoSelect,contactoMensaje)){
            e.preventDefault();
        }
    });

    contactoEmail.addEventListener('focusout', () => {
        checkEmailOnFocusOut(contactoEmail);
    });

    contactoEmail.addEventListener('input', () => {
        resetInput(contactoEmail);
    });

    contactoSelect.addEventListener('input', () => {
        resetInput(contactoSelect);
    });

    contactoMensaje.addEventListener('input', () => {
        resetInput(contactoMensaje);
    });

}

function checkContactoInputsOnSubmit(contactoEmail, contactoSelect, contactoMensaje) {
    //get values from the inputs
    const emailValue = contactoEmail.value.trim();
    const contactoSelectValue = contactoSelect.value.trim();
    const contactoMensajeValue = contactoMensaje.value.trim();

    if(emailValue === '') {
        //add error class
        setErrorFor(contactoEmail, 'Por favor ingrese un email');
    } else if(!isEmail(emailValue)) {
        setErrorFor(contactoEmail, 'Por favor ingrese un email válido');
    } else {
        //add success class
        setSuccessFor(contactoEmail );
    }

    if(contactoSelectValue === '') {
        setErrorFor(contactoSelect, 'Por favor seleccione algo');
    } else {
        setSuccessFor(contactoSelect);
    }

    if(contactoMensajeValue === '') {
        setErrorFor(contactoMensaje, 'Por favor ingrese sun mensaje');
    } else {
        setSuccessFor(contactoMensaje);
    }


    return checkSuccess(contactoEmail) && checkSuccess(contactoSelect) && checkSuccess(contactoMensaje);
}
