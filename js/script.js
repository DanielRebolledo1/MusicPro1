const body = document.body;

if (body.classList.contains('home')) {
    console.log('home')

    $(document).ready(function() {
        const $subsEmail = $('#subs-email');

        $('#subs-form').on('submit', function(e){
            if (!checkSubsInputsOnSubmit($subsEmail.get(0))) {
                e.preventDefault();
            }
        });

        $($subsEmail).on({
            focusout: function() {
                checkEmailOnFocusOut($subsEmail.get(0));
            },
            input: function() {
                resetInput($subsEmail.get(0));
            }
        });

        sidebarFunctions();
    });

    //Carousels configuration (Swiper)
    swiper1 = new Swiper('.swiper1', {
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
    swiper2 = new Swiper('.swiper2', {
        grabCursor: true,
        clickable: false,
        slidesPerView: 1,
        speed: 500,
        autoHeight: true,
        spaceBetween: 20,
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
    swiper3 = new Swiper('.swiper3', {
        grabCursor: true,
        clickable: false,
        slidesPerView: 1,
        speed: 500,
        autoHeight: true,
        // Optional parameters
        direction: 'horizontal',
        spaceBetween: 20,

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
}

if (body.classList.contains('login-register')) {
    console.log('login/register')

    $(document).ready(function() {
        const $loginEmail = $('#login-email');
        const $loginPassword = $('#login-pw');
        const $forgotPasswordEmail = $('#forgot-pw-email');
        const $registerName = $('#register-name');
        const $registerLastName = $('#register-lastname');
        const $registerEmail = $('#register-email');
        const $registerPassword = $('#register-pw');

        $('#login-form').on('submit', function(e){
            if (!checkLoginInputsOnSubmit($loginEmail.get(0), $loginPassword.get(0))) {
                e.preventDefault();
            }
        });

        $($loginEmail).on({
            focusout: function() {
                checkEmailOnFocusOut($loginEmail.get(0));
            },
            input: function() {
                resetInput($loginEmail.get(0));
            }
        });

        $($loginPassword).on('input', function(){
            resetInput($loginPassword.get(0));
        });

        $('#forgot-pw-form').on('submit', function (e){
            if (!checkForgotPasswordInputsOnSubmit($forgotPasswordEmail.get(0))) {
                e.preventDefault();
            }
        });

        $($forgotPasswordEmail).on({
            focusout: function() {
                checkEmailOnFocusOut($forgotPasswordEmail.get(0));
            },
            input: function() {
                resetInput($forgotPasswordEmail.get(0));
            }
        });

        $('#register-form').on('submit', function (e){
            if (!checkRegisterInputsOnSubmit($registerEmail.get(0), $registerPassword.get(0),
                $registerName.get(0), $registerLastName.get(0))) {
                    e.preventDefault();
            }
        });

        $($registerName).on('input', function(){
            resetInput($registerName.get(0));
        });

        $($registerLastName).on('input', function(){
            resetInput($registerLastName.get(0));
        });

        $($registerEmail).on({
            focusout: function() {
                checkEmailOnFocusOut($registerEmail.get(0));
            },
            input: function() {
                resetInput($registerEmail.get(0));
            }
        });

        $($registerPassword).on('input', function(){
            resetInput($registerPassword.get(0));
        });

        $('#login-sh-btn').on('click', function(){
            togglePasswordView($loginPassword.get(0), $('#login-sh-btn').get(0));
        });

        $('#register-sh-btn').on('click', function(){
            togglePasswordView($registerPassword.get(0), $('#register-sh-btn').get(0));
        });

        $('#forgot-pw-btn').on('click', function () {
            $('#login-register-tabs, #forgot-pw-tab').toggle();
            $('#login-form').get(0).reset();
            $('#register-form').get(0).reset();
            resetInput($loginEmail.get(0));
            resetInput($loginPassword.get(0));
            resetInput($registerEmail.get(0));
            resetInput($registerName.get(0));
            resetInput($registerLastName.get(0));
            resetInput($registerPassword.get(0));
        });

        $('#forgot-pw-back-btn').on('click', function () {
            $('#login-register-tabs, #forgot-pw-tab').toggle();
            $('#forgot-pw-form').get(0).reset();
            resetInput($forgotPasswordEmail.get(0));
        });

        $('#register-shortcut-btn').on('click', function () {
            $('#pills-register-tab').click();
        });

        $('#pills-register-tab').on('click', function () {
            $('#login-form').get(0).reset();
            resetInput($loginEmail.get(0));
            resetInput($loginPassword.get(0));
        });

        $('#pills-login-tab').on('click', function () {
            $('#register-form').get(0).reset();
            resetInput($registerEmail.get(0));
            resetInput($registerName.get(0));
            resetInput($registerLastName.get(0));
            resetInput($registerPassword.get(0));
        });
    });
}

if (body.classList.contains('home-contacto')){
    console.log('home-contacto')

    $(document).ready(function() {
        sidebarFunctions();

        const contactoForm = document.getElementById('contacto-form')
        const contactoEmail = document.getElementById('contacto-email')
        const contactoMensaje = document.getElementById('contacto-mensaje')
        const contactoselect = document.getElementById('contacto-select')

        contactoForm.addEventListener('submit', (e) => {
            if(!checkContactoInputsOnSubmit(contactoEmail, contactoMensaje,contactoselect)){
                e.preventDefault();
            }
        });

        contactoEmail.addEventListener('focusout', () => {
            checkEmailOnFocusOut(contactoEmail);
        });

        contactoEmail.addEventListener('input', () => {
            resetInput(contactoEmail);
        });

        contactoMensaje.addEventListener('input', () => {
            resetInput(contactoMensaje);
        });
        contactoselect.addEventListener('input', () => {
            resetInput(contactoselect);
        });

    });
}

function checkContactoInputsOnSubmit(contactoEmail, contactoMensaje, contactoselect) {
    //get values from the inputs
    const emailValue = contactoEmail.value.trim();
    const contactoMensajeValue = contactoMensaje.value.trim();
    const contactoSelectValue = contactoselect.value.trim();;

    
    if(contactoSelectValue == '') {
        setErrorFor(contactoselect, 'Por favor seleccione tipo de consulta ');
    } else {
        setSuccessFor(contactoselect);
    }


    if(emailValue === '') {
        //add error class
        setErrorFor(contactoEmail, 'Por favor ingrese un email');
    } else if(!isEmail(emailValue)) {
        setErrorFor(contactoEmail, 'Por favor ingrese un email válido');
    } else {
        //add success class
        setSuccessFor(contactoEmail );
    }

    if(contactoMensajeValue === '') {
        setErrorFor(contactoMensaje, 'Por favor ingrese un mensaje');
    } else {
        setSuccessFor(contactoMensaje);
    }

    return checkSuccess(contactoEmail) && checkSuccess(contactoMensaje) && checkSuccess(contactoselect);
}

if (body.classList.contains('product')) {
    console.log('product')

    $(document).ready(function() {
        sidebarFunctions();

        $(".video-cover").on("click", function (ev) {
            "use strict";
            ev.preventDefault();
            videoStop();
            var $poster = $(this);
            var $wrapper = $poster.closest(".main-videos");
            videoPlay($wrapper);
        });

        $('#show-description-btn').on('click', function () {
            let wrapper = document.querySelector(".description-wrapper");
            let button = document.getElementById('show-description-btn');
            toggleViewMore(wrapper, button);
        });
    });

    galleryLightbox = $('.gallery a').simpleLightbox({
        animationSpeed: 200,
        disableRightClick: true,
    });
    galleryThumbs = new Swiper(".gallery-thumbs", {
        direction: "vertical",
        slidesPerView: 4,
        spaceBetween: 10,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        mousewheel: true,

        navigation: {
            nextEl: ".thumbs-next",
            prevEl: ".thumbs-prev",
        },
    });
    galleryMain = new Swiper(".gallery-main", {
        direction: "horizontal",
        mousewheel: true,

        thumbs: {
            swiper: galleryThumbs,
        },

        pagination: {
            el: '.gallery-pagination',
            bulletClass: 'gallery-pagination-bullet',
            clickable: true
        },

        on: {
            slideChange: function () {
                let activeIndex = this.activeIndex + 1;

                let nextSlide = document.querySelector(`.gallery-thumbs .swiper-slide:nth-child(${activeIndex + 1})`);
                let prevSlide = document.querySelector(`.gallery-thumbs .swiper-slide:nth-child(${activeIndex - 1})`);

                if (nextSlide && !nextSlide.classList.contains('swiper-slide-visible')) {
                    this.thumbs.swiper.slideNext()
                } else if (prevSlide && !prevSlide.classList.contains('swiper-slide-visible')) {
                    this.thumbs.swiper.slidePrev()
                }

                videoStop();
            }
        },

        breakpoints: {
            768: {
                direction: "vertical"
            }
        }
    });
    productList1 = new Swiper('.item-carousel1', {
        grabCursor: true,
        slidesPerView: 1,
        speed: 500,
        spaceBetween: 30,
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
}

//Validaciones de formularios

function checkLoginInputsOnSubmit(loginEmail, loginPassword) {
    //get values from the inputs
    const emailValue = loginEmail.value.trim();
    const passwordValue = loginPassword.value.trim();

    if (emailValue === '') {
        //add error class
        setErrorFor(loginEmail, 'Por favor ingrese un email');
    } else if (!isEmail(emailValue)) {
        setErrorFor(loginEmail, 'Por favor ingrese un email válido');
    } else {
        //add success class
        setSuccessFor(loginEmail);
    }

    if (passwordValue === '') {
        setErrorFor(loginPassword, 'Por favor ingrese su contraseña');
    } else {
        setSuccessFor(loginPassword);
    }

    return checkSuccess(loginEmail) && checkSuccess(loginPassword);
}

function checkForgotPasswordInputsOnSubmit(forgotPasswordEmail) {
    //get values from the inputs
    const emailValue = forgotPasswordEmail.value.trim();

    if (emailValue === '') {
        //add error class
        setErrorFor(forgotPasswordEmail, 'Por favor ingrese un email');
    } else if (!isEmail(emailValue)) {
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

    if (emailValue === '') {
        //add error class
        setErrorFor(registerEmail, 'Por favor ingrese un email');
    } else if (!isEmail(emailValue)) {
        setErrorFor(registerEmail, 'Por favor ingrese un email válido');
    } else {
        //add success class
        setSuccessFor(registerEmail);
    }

    if (passwordValue === '') {
        setErrorFor(registerPassword, 'Por favor ingrese una contraseña');
    } else {
        setSuccessFor(registerPassword);
    }

    if (nameValue === '') {
        setErrorFor(registerName, 'Por favor ingrese su nombre');
    } else {
        setSuccessFor(registerName);
    }

    if (lastNameValue === '') {
        setErrorFor(registerLastName, 'Por favor ingrese su apellido');
    } else {
        setSuccessFor(registerLastName);
    }

    return checkSuccess(registerEmail) && checkSuccess(registerPassword) && checkSuccess(registerName) && checkSuccess(registerLastName);
}

function checkSubsInputsOnSubmit(subsEmail) {
    //get values from the inputs
    const emailValue = subsEmail.value.trim();

    if (emailValue === '') {
        //add error class
        setErrorFor(subsEmail, 'Por favor ingrese un email');
    } else if (!isEmail(emailValue)) {
        setErrorFor(subsEmail, 'Por favor ingrese un email válido');
    } else {
        //add success class
        setSuccessFor(subsEmail);
    }

    return checkSuccess(subsEmail);
}

function checkEmailOnFocusOut(email) {
    const emailValue = email.value.trim();

    if (!isEmail(emailValue) && emailValue !== '') {
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

function checkSuccess(input) {
    const formOutline = input.parentElement;
    return formOutline.classList.contains('success');
}

//Ver contrasena/ocultar

function togglePasswordView(password, button) {
    if (password.type === 'password') {
        password.type = 'text';
        button.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    } else {
        password.type = 'password';
        button.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }
}

//Ver subcategorias/ocultar

function toggleCategoryShow($category, icon) {
    $category.slideToggle(300);

    if (icon.classList.contains('hide')) {
        icon.classList.remove('hide');
        icon.classList.add('show');
    } else {
        icon.classList.remove('show');
        icon.classList.add('hide');
    }
}

//Funciones del sidebar
function sidebarFunctions() {
    const $sidebar = $('#sidebar');
    const $sidebarContainer = $('#sidebar-container');
    const categoryShowIcon1 = document.getElementById('show-icon-1')
    const categoryShowIcon2 = document.getElementById('show-icon-2')
    const categoryShowIcon3 = document.getElementById('show-icon-3')

    $('#sidebar-open-btn').on('click', function () {
        $($sidebarContainer).show();
        $($sidebar).show("slide", 300);
        $($sidebar).css('overflow', 'auto');
        $('body').css('overflow', 'hidden');
    });

    $('#sidebar-close-btn').on('click', function () {
        $($sidebarContainer).hide("fade", 300);
        $($sidebar).hide("slide", 300);
        $('body').css('overflow', 'auto');

        if (categoryShowIcon1.classList.contains('hide')) {
            toggleCategoryShow($('#category-1-sub'), categoryShowIcon1);
        }

        if (categoryShowIcon2.classList.contains('hide')) {
            toggleCategoryShow($('#category-2-sub'), categoryShowIcon2);
        }

        if (categoryShowIcon3.classList.contains('hide')) {
            toggleCategoryShow($('#category-3-sub'), categoryShowIcon3);
        }
    });

    $('#sidebar-bg').on('click', function () {
        $('#sidebar-close-btn').click();
    });

    $('#category-1-btn').on('click', function () {
        toggleCategoryShow($('#category-1-sub'), categoryShowIcon1);
    });

    $('#category-2-btn').on('click', function () {
        toggleCategoryShow($('#category-2-sub'), categoryShowIcon2);
    });

    $('#category-3-btn').on('click', function () {
        toggleCategoryShow($('#category-3-sub'), categoryShowIcon3);
    });
}

//Funciones de videos
function videoPlay($wrapper) {
    "use strict";
    var $iframe = $wrapper.find(".video-player");
    var src = $iframe.data("src");
    // hide poster
    $wrapper.addClass("main-videos-active");
    // add iframe src in, starting the video
    $iframe.attr("src", src);
}

function videoStop($wrapper) {
    "use strict";
    let $iframe;
    // if we're stopping all videos on page
    if (!$wrapper) {
        $wrapper = $(".main-videos");
        $iframe = $(".video-player");
        // if we're stopping a particular video
    } else {
        $iframe = $wrapper.find(".video-player");
    }
    // reveal poster
    $wrapper.removeClass("main-videos-active");
    // remove youtube link, stopping the video from playing in the background
    $iframe.attr("src", "");
}

//Ver más/menos
function toggleViewMore(wrapper, button) {
    if (wrapper.classList.contains("show-less")) {
        wrapper.classList.remove("show-less");
        button.innerText = 'Ver más';
    } else {
        wrapper.classList.add("show-less");
        button.innerText = 'Ver menos';
    }
}