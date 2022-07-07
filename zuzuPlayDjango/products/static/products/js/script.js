const body = document.body;

if (body.classList.contains('home')) {
    console.log('home')

    $(document).ready(function () {
        const $subsForm = $('#subs-form');
        const $subsEmail = $('#subs-email');

        let formData = '';
        const csrftoken = getCookie('csrftoken');

        $subsForm.on('submit', function (e) {
            if (checkSubsInputsOnSubmit($subsEmail.get(0))) {
                formData = new FormData($subsForm.get(0));
                formData.append('action', 'newSub');
                $.ajax({
                    url: '',
                    type: 'POST',
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        if (JSON.parse(response['success'])) {
                            setPostSuccessFor($subsEmail.get(0), 'Te has suscrito con éxito.');
                        } else {
                            setErrorFor($subsEmail.get(0), 'Algo salió mal!');
                        }
                    }
                })
            }
            e.preventDefault();
        });

        $($subsEmail).on({
            focusout: function () {
                checkEmailOnFocusOut($subsEmail.get(0));
            },
            input: function () {
                resetInput($subsEmail.get(0));
            }
        });

        sidebarMenuFunctions();
        cartSidebarFunctions();
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

    $(document).ready(function () {
        const $loginForm = $('#login-form');
        const $loginEmail = $('#login-email');
        const $loginPassword = $('#login-pw');
        const $forgotPasswordEmail = $('#forgot-pw-email');
        const $registerForm = $('#register-form');
        const $registerName = $('#register-name');
        const $registerLastName = $('#register-lastname');
        const $registerEmail = $('#register-email');
        const $registerPassword = $('#register-pw');
        const $registerResponse = $('#register-response');
        const passwordStrengthIndicator = document.getElementById('pw-strength');

        let formData = '';
        const csrftoken = getCookie('csrftoken');

        $loginForm.on('submit', function (e) {
            if (checkLoginInputsOnSubmit($loginEmail.get(0), $loginPassword.get(0))) {
                formData = new FormData($loginForm.get(0));
                formData.append('action', 'login');
                $.ajax({
                    url: '',
                    type: 'POST',
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        if (JSON.stringify(response).includes('error')) {
                            let error = JSON.parse(JSON.stringify(response.error));
                            if (error === 'email') {
                                setErrorFor($loginEmail.get(0), 'Email no registrado');
                            } else if (error === 'password') {
                                setErrorFor($loginPassword.get(0), 'Contraseña incorrecta');
                            }
                        } else {
                            window.location = JSON.parse(JSON.stringify(response.url));
                        }
                    }
                })
            }
            e.preventDefault();
        });

        $loginEmail.on({
            focusout: function () {
                checkEmailOnFocusOut($loginEmail.get(0));
            },
            input: function () {
                resetInput($loginEmail.get(0));
            }
        });

        $loginPassword.on('input', function () {
            resetInput($loginPassword.get(0));
        });

        $('#forgot-pw-form').on('submit', function (e) {
            if (checkForgotPasswordInputsOnSubmit($forgotPasswordEmail.get(0))) {

            }
            e.preventDefault();
        });

        $forgotPasswordEmail.on({
            focusout: function () {
                checkEmailOnFocusOut($forgotPasswordEmail.get(0));
            },
            input: function () {
                resetInput($forgotPasswordEmail.get(0));
            }
        });

        $registerForm.on('submit', function (e) {
            if (checkRegisterInputsOnSubmit($registerEmail.get(0), $registerPassword.get(0),
                passwordStrengthIndicator, $registerName.get(0), $registerLastName.get(0))) {
                formData = new FormData($registerForm.get(0));
                formData.append('action', 'register');
                $.ajax({
                    url: '',
                    type: 'POST',
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        if (JSON.parse(response['success'])) {
                            $registerResponse.html('');
                            fillInput($loginEmail, $registerEmail.val());
                            $('#pills-login-tab').click();
                        } else {
                            $registerResponse.html('');
                            let error = JSON.parse(JSON.stringify(response['errors']));
                            if (error === 'email') {
                                setErrorFor($registerEmail.get(0), 'Email ya registrado');
                            } else if (error === 'social') {
                                let social = JSON.stringify(response['name']);
                                if (social.includes('google')) {
                                    setErrorFor($registerEmail.get(0), 'Email ya registrado con Google');
                                } else {
                                    setErrorFor($registerEmail.get(0), 'Email ya registrado con una red social');
                                }
                            } else {
                                $registerResponse.removeClass('success')
                                $registerResponse.html('No se pudo crear el usuario.').addClass('error');
                            }
                        }
                    }
                })
            }
            e.preventDefault();
        });

        $registerName.on('input', function () {
            resetInput($registerName.get(0));
        });

        $registerLastName.on('input', function () {
            resetInput($registerLastName.get(0));
        });

        $registerEmail.on({
            focusout: function () {
                checkEmailOnFocusOut($registerEmail.get(0));
            },
            input: function () {
                resetInput($registerEmail.get(0));
            }
        });

        $registerPassword.on('input', function () {
            resetInput($registerPassword.get(0));
            checkPasswordStrength($registerPassword.get(0), passwordStrengthIndicator);
        });

        $('#login-sh-btn').on('click', function () {
            togglePasswordView($loginPassword.get(0), $('#login-sh-btn').get(0));
        });

        $('#register-sh-btn').on('click', function () {
            togglePasswordView($registerPassword.get(0), $('#register-sh-btn').get(0));
        });

        $('#forgot-pw-btn').on('click', function () {
            $('#login-register-tabs, #forgot-pw-tab').toggle();
            $loginForm.get(0).reset();
            $registerForm.get(0).reset();
            $registerResponse.html('');
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
            $loginForm.get(0).reset();
            resetInput($loginEmail.get(0));
            resetInput($loginPassword.get(0));
        });

        $('#pills-login-tab').on('click', function () {
            $registerForm.get(0).reset();
            $registerResponse.html('');
            $('#pw-policies').slideUp(400);
            resetPasswordStrength(passwordStrengthIndicator);
            resetInput($registerEmail.get(0));
            resetInput($registerName.get(0));
            resetInput($registerLastName.get(0));
            resetInput($registerPassword.get(0));
        });
    });
}

if (body.classList.contains('contact')) {
    console.log('contact')

    $(document).ready(function () {
        sidebarMenuFunctions();

        const contactForm = document.getElementById('contact-form');
        const contactEmail = document.getElementById('contact-email');
        const contactMessage = document.getElementById('contact-message');
        const contactSelect = document.getElementById('contact-select');

        contactForm.addEventListener('submit', (e) => {
            if (!checkContactInputsOnSubmit(contactEmail, contactMessage, contactSelect)) {
                e.preventDefault();
            }
        });

        contactEmail.addEventListener('focusout', () => {
            checkEmailOnFocusOut(contactEmail);
        });

        contactEmail.addEventListener('input', () => {
            resetInput(contactEmail);
        });

        contactMessage.addEventListener('input', () => {
            resetInput(contactMessage);
        });

        contactSelect.addEventListener('change', () => {
            resetInput(contactSelect);
        });
    });
}

if (body.classList.contains('product')) {
    console.log('product')

    $(document).ready(function () {
        sidebarMenuFunctions();
        getProductSpecs();

        const csrftoken = getCookie('csrftoken');
        const $productGallery = $('#product-gallery');
        const $productThumbsGallery = $('#product-thumbs-gallery');
        const productId = $('#product-id').html().split(' ')[1];

        $.ajax({
            url: '/api/videos',
            type: 'POST',
            headers: {'X-CSRFToken': csrftoken},
            data: {
                'id': productId,
            },
            mode: 'same-origin',
            //async: false,
            success: function (response) {
                $.each(response, function () {
                    let url = JSON.parse(JSON.stringify(this['url']))
                    let id = url.split('/').at(-1)
                    let cover = '<button class="video-cover">' +
                        '<span class="row gx-0 w-100 h-100 justify-content-center align-items-center">' +
                        '<img src="https://img.youtube.com/vi/' + id + '/maxresdefault.jpg" class="img-fluid" ' +
                        'alt="https://img.youtube.com/vi/' + id + '/maxresdefault.jpg">' +
                        '<i class="fa-regular fa-circle-play position-absolute"></i></span></button>'
                    let video = '<iframe class="video-player" src="data:," allowfullscreen ' +
                        'data-src="' + url + '?autoplay=1" allow="autoplay;"></iframe>'
                    let galleryDiv = '<div class="swiper-slide"><div class="row main-videos gx-0 h-100 ' +
                        'justify-content-center align-items-center">' + cover + video + '</div></div>'
                    let thumbsDiv = '<div class="swiper-slide">' +
                        '<div class="row thumbs-images h-100 justify-content-center align-items-center">' +
                        '<img src="https://img.youtube.com/vi/' + id + '/hqdefault.jpg" ' +
                        'alt="https://img.youtube.com/vi/' + id + '/hqdefault.jpg">' +
                        '<i class="fa-regular fa-circle-play position-absolute text-center"></i></div></div>'
                    $productThumbsGallery.append(thumbsDiv);
                    $productGallery.append(galleryDiv);
                });
            },
            complete: function () {
                galleryInitialization();
            }
        });

        function galleryInitialization() {
            galleryLightbox = $('.gallery a').simpleLightbox({
                animationSpeed: 200,
                disableRightClick: true,
                fileExt: false,
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

            $(".video-cover").on("click", function () {
                videoStop();
                var $poster = $(this);
                var $wrapper = $poster.closest(".main-videos");
                videoPlay($wrapper);
            });
        }

        $('#show-description-btn').on('click', function () {
            let wrapper = document.querySelector(".description-wrapper");
            let button = document.getElementById('show-description-btn');
            toggleViewMore(wrapper, button);
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
    });
}

if (body.classList.contains('category')) {
    console.log('category')

    $(document).ready(function () {
        sidebarMenuFunctions();

        const $sidebar = $('#cat-sb');
        const $sidebarContainer = $('#cat-sb-container');
        const filterShowIcon1 = document.getElementById('filter-show-icon-1');
        const filterShowIcon2 = document.getElementById('filter-show-icon-2');
        const filterShowIcon3 = document.getElementById('filter-show-icon-3');

        $('#cat-sb-open-btn').on('click', function () {
            $($sidebarContainer).show();
            $($sidebar).show("slide", 300);
            $($sidebar).css('overflow', 'auto');
            $('body').css('overflow', 'hidden');
        });

        $('#cat-sb-close-btn').on('click', function () {
            $($sidebarContainer).hide("fade", 300);
            $($sidebar).hide("slide", 300);
            $('body').css('overflow', 'auto');

            if (filterShowIcon1.classList.contains('hide')) {
                toggleCategoryShow($('#filter-1-sub'), filterShowIcon1);
            }

            if (filterShowIcon2.classList.contains('hide')) {
                toggleCategoryShow($('#filter-2-sub'), filterShowIcon2);
            }

            if (filterShowIcon3.classList.contains('hide')) {
                toggleCategoryShow($('#filter-3-sub'), filterShowIcon3);
            }
        });

        $('#cat-sb-bg').on('click', function () {
            $('#cat-sb-close-btn').click();
        });

        $('#filter-1-btn').on('click', function () {
            toggleCategoryShow($('#filter-1-sub'), filterShowIcon1);
        });

        $('#filter-2-btn').on('click', function () {
            toggleCategoryShow($('#filter-2-sub'), filterShowIcon2);
        });

        $('#filter-3-btn').on('click', function () {
            toggleCategoryShow($('#filter-3-sub'), filterShowIcon3);
        });

        // Create a condition that targets viewports at least 768px wide
        const mediaQuery = window.matchMedia('(min-width: 768px)');

        function handleViewportChange(e) {
            // Check if the media query is true
            if (e.matches) {
                $sidebar.removeAttr('style');
                $sidebarContainer.removeAttr('style');
                $('body').css('overflow', 'auto');
            }
        }

        // Register event listener
        mediaQuery.addListener(handleViewportChange);

        // Initial check
        handleViewportChange(mediaQuery);

        //Pagination

        //Django Pagination
        const numPages = $('#numPages').val();
        const currentPage = parseInt($('#currentPage').val());
        let $lastPage = $('#lastPage');

        for (let i = 0; i < numPages; i++) {
            let pageNumber = (i + 1);
            let page = '<li class="page-item">' +
                '<a href="?page=' + pageNumber + '" ' +
                'class="page-link page-btn">' + pageNumber + '</a></li>';
            if (pageNumber === currentPage) {
                page = '<li class="page-item active">' +
                    '<a href="?page=' + pageNumber + '" ' +
                    'class="page-link page-btn">' + pageNumber + '</a></li>'
            }
            $lastPage.before(page)
        }
    });
}

if (body.classList.contains('questions')) {
    console.log('questions')

    $(document).ready(function () {
        sidebarMenuFunctions();
    });
}

if (body.classList.contains('stores')) {
    console.log('stores')

    $(document).ready(function () {
        sidebarMenuFunctions();
    });
}

if (body.classList.contains('terms')) {
    console.log('terms')

    $(document).ready(function () {
        sidebarMenuFunctions();
    });
}

if (body.classList.contains('denied')) {
    console.log('denied access')

    $(document).ready(function () {
        sidebarMenuFunctions();
    });
}

if (body.classList.contains('admin')) {
    console.log('admin')

    UPLOADCARE_LOCALE = 'es';
    uploadcare.registerTab('preview', uploadcareTabEffects);
    UPLOADCARE_TABS = "file gdrive";
    UPLOADCARE_EFFECTS = "crop, rotate, mirror, sharp, blur, flip, enhance, grayscale, invert";
    UPLOADCARE_CLEARABLE = 'true';

    $(document).ready(function () {
        let product = '';
        let formData = '';

        const csrftoken = getCookie('csrftoken');
        const sessiontoken = getCookie('sessiontoken');

        // Nuevo producto
        const $newProductForm = $('#new-product-form');
        const $newProductResponse = $('#new-product-response');
        const $newProductSearch = $('#new-product-search');
        const $newProductName = $('#new-product-name');
        const $newProductImg = $('#new-product-img');
        const newProductImgWidget = uploadcare.Widget('#new-product-img');
        const $newProductDate = $('#new-product-date');
        const $newProductPrice = $('#new-product-price');
        const $newProductBrand = $('#new-product-brand');
        const $newProductSubcategory = $('#new-product-subcategory');
        const $newProductPlatform = $('#new-product-platform');

        $newProductSearch.autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: '?search=' + request.term,
                    type: 'POST',
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    data: {
                        'action': 'autocomplete',
                        'term': request.term,
                    },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return {
                                value: item.buscar,
                                'nombre': item.nombre,
                                'fechaLan': item.fechaLan,
                                'precio': item.precio,
                                'marca': item.marca,
                                'subcategoria': item.subcategoria,
                                'plataforma': item.plataforma,
                            }
                        }));
                    },
                });
            },
            delay: 0,
            minLength: 2,
            select: function (event, ui) {
                fillInput($newProductSearch, ui.item.value);
                fillInput($newProductName, ui.item.nombre);
                fillInput($newProductDate, ui.item.fechaLan);
                $newProductDate.css('opacity', 1);
                fillInput($newProductPrice, ui.item.precio);
                fillInput($newProductBrand, ui.item.marca);
                fillInput($newProductSubcategory, ui.item.subcategoria);
                fillInput($newProductPlatform, ui.item.plataforma);
                $newProductResponse.html('');
                return false;
            }
        });

        $newProductForm.on('submit', function (e) {
            e.preventDefault();
            if (checkNewProductInputsOnSubmit($newProductName.get(0), $newProductImg.get(0), $newProductDate.get(0),
                $newProductPrice.get(0), $newProductBrand.get(0), $newProductSubcategory.get(0),
                $newProductPlatform.get(0))) {
                if (!productExists($newProductName.val(), $newProductPlatform.val())) {
                    formData = new FormData($newProductForm.get(0));
                    formData.append('action', 'newProduct');
                    $.ajax({
                        url: '',
                        type: 'POST',
                        headers: {'X-CSRFToken': csrftoken},
                        mode: 'same-origin',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            if (JSON.parse(response['success'])) {
                                $newProductImg.removeClass('error');
                                newProductImgWidget.value(null);
                                $newProductResponse.removeClass('error')
                                $newProductResponse.html('Producto agregado con éxito.').addClass('success');
                            } else {
                                $newProductResponse.removeClass('success')
                                $newProductResponse.html('No se pudo agregar el producto.').addClass('error');
                            }
                        },
                    });
                } else {
                    $newProductResponse.removeClass('success');
                    $newProductResponse.html('El producto que intentas agregar ya existe.').addClass('error');
                }
            }
        });

        $newProductForm.on('reset', function () {
            $newProductSearch.val('');
            $newProductResponse.html('');
            resetInput($newProductName.get(0));
            newProductImgWidget.value(null);
            $newProductImg.removeClass('error');
            resetInput($newProductDate.get(0));
            $newProductDate.css('opacity', 0);
            resetInput($newProductPrice.get(0));
            resetInput($newProductBrand.get(0));
            resetInput($newProductSubcategory.get(0));
            resetInput($newProductPlatform.get(0));
        });

        $("#new-product-form input").each(function () {
            $(this).on('input', function () {
                resetInput($(this).get(0));
            });
        });

        $("#new-product-form select").each(function () {
            $(this).on('change', function () {
                resetInput($(this).get(0));
            });
        });

        newProductImgWidget.onChange(function (file) {
            if (file) {
                $newProductImg.removeClass('error');
            }
        });

        // Modificar producto
        const $editProductForm = $('#edit-product-form');
        const $editProductResponse = $('#edit-product-response');
        const $editProductSearch = $('#edit-product-search');
        const $editProductCurrentImg = $('#edit-product-current-img');
        const $editProductId = $('#edit-product-id');
        const $editProductName = $('#edit-product-name');
        const $editProductImg = $('#edit-product-img');
        const editProductImgWidget = uploadcare.Widget('#edit-product-img');
        const $editProductDate = $('#edit-product-date');
        const $editProductPrice = $('#edit-product-price');
        const $editProductBrand = $('#edit-product-brand');
        const $editProductSubcategory = $('#edit-product-subcategory');
        const $editProductPlatform = $('#edit-product-platform');
        const $editVisibleProductSubcategory = $('#edit-product-subcategory-visible');
        const $editVisibleProductPlatform = $('#edit-product-platform-visible');
        const $editProductBtn = $('#edit-product-btn');
        const $deleteProductBtn = $('#delete-product-btn');

        $editProductSearch.autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: '?search=' + request.term,
                    type: 'POST',
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    data: {
                        'action': 'autocomplete',
                        'term': request.term,
                    },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return {
                                value: item.buscar,
                                'id': item.id,
                                'nombre': item.nombre,
                                'imagen': item.imagen,
                                'fechaLan': item.fechaLan,
                                'precio': item.precio,
                                'marca': item.marca,
                                'subcategoria': item.subcategoria,
                                'plataforma': item.plataforma,
                                'nombreSubcategoria': item.nombreSubcategoria,
                                'nombrePlataforma': item.nombrePlataforma,
                            }
                        }));
                    },
                });
            },
            delay: 0,
            minLength: 2,
            select: function (event, ui) {
                product = ui.item;
                console.log(product)
                fillInput($editProductSearch, ui.item.value);
                $editProductCurrentImg.attr('src', ui.item.imagen).addClass('visible');
                fillInput($editProductId, ui.item.id);
                fillAndEnableInput($editProductName, ui.item.nombre);
                $editProductImg.removeAttr('disabled');
                fillAndEnableInput($editProductDate, ui.item.fechaLan);
                $editProductDate.css('opacity', 1);
                fillAndEnableInput($editProductPrice, ui.item.precio);
                fillAndEnableInput($editProductBrand, ui.item.marca);
                fillInput($editProductSubcategory, ui.item.subcategoria);
                fillInput($editProductPlatform, ui.item.plataforma);
                fillInput($editVisibleProductSubcategory, ui.item.nombreSubcategoria);
                fillInput($editVisibleProductPlatform, ui.item.nombrePlataforma);
                fillVideosTable($videosTableBody, ui.item.id, $saveVideosChangesBtn, $deleteVideoBtn, $deleteVideoId, $deleteVideoPreview);
                $deleteProductBtn.removeAttr("disabled");
                $editProductBtn.removeAttr("disabled");
                $editProductResponse.html('');
                $addVideoBtn.removeAttr("disabled");
                return false;
            }
        });

        $editProductForm.on('submit', function (e) {
            e.preventDefault();
            if (checkEditProductInputsOnSubmit($editProductName.get(0), $editProductDate.get(0),
                $editProductPrice.get(0), $editProductBrand.get(0))) {
                if (productChangesBeenMade(product, $editProductName.val(), $editProductImg.val(), $editProductDate.val(),
                    $editProductPrice.val(), $editProductBrand.val())) {
                    if (!editProductExists($editProductId.val(), $editProductName.val(), $editProductPlatform.val())) {
                        formData = new FormData($editProductForm.get(0));
                        formData.append('action', 'editProduct')
                        $.ajax({
                            url: '',
                            type: 'POST',
                            headers: {'X-CSRFToken': csrftoken},
                            mode: 'same-origin',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (response) {
                                if (JSON.parse(response['success'])) {
                                    product.value = $editProductName.val() + ' ' + $editProductPlatform.val();
                                    product.nombre = $editProductName.val();
                                    product.imagen = response['imagen'];
                                    product.fechaLan = $editProductDate.val();
                                    product.precio = $editProductPrice.val();
                                    product.marca = $editProductBrand.val();
                                    editProductImgWidget.value(null);
                                    $('#edit-product-current-img').attr('src', product.imagen);
                                    $editProductResponse.removeClass('error')
                                    $editProductResponse.html('Producto modificado con éxito.').addClass('success');
                                } else {
                                    $editProductResponse.removeClass('success')
                                    $editProductResponse.html('No se pudo modificar el producto.').addClass('error');
                                }
                            },
                        });
                    } else {
                        $editProductResponse.removeClass('success');
                        $editProductResponse.html('El nuevo nombre coincide con el de un producto existente.').addClass('error');
                    }
                } else {
                    $editProductResponse.removeClass('success').removeClass('error')
                    $editProductResponse.html('No se realizaron cambios.');
                }
            }
        });

        $("#edit-product-form input").each(function () {
            $(this).on('input', function () {
                resetInput($(this).get(0));
            });
        });

        $("#edit-product-form select").each(function () {
            $(this).on('change', function () {
                resetInput($(this).get(0));
            });
        });

        // Eliminar producto
        const $deleteProductCancelBtn = $('#delete-product-cancel-btn');
        const $deleteProductConfirmBtn = $('#delete-product-confirm-btn');

        $deleteProductBtn.on('click', function () {
            $('#delete-product-id').html(product.id);
            $('#delete-product-name').html(product.value);
        });

        $deleteProductConfirmBtn.on('click', function () {
            $.ajax({
                url: '',
                type: 'POST',
                headers: {'X-CSRFToken': csrftoken},
                mode: 'same-origin',
                data: {
                    'action': 'deleteProduct',
                    'id': product.id,
                },
                success: function (response) {
                    if (JSON.parse(response['success'])) {
                        $deleteProductCancelBtn.click();
                        $editProductSearch.val('');
                        $editProductForm.get(0).reset();
                        $editProductCurrentImg.attr('src', '').removeClass('visible');
                        resetInput($editProductId.get(0));
                        resetAndDisableInput($editProductName);
                        editProductImgWidget.value(null);
                        resetAndDisableInput($editProductDate);
                        $editProductDate.css('opacity', 0);
                        resetAndDisableInput($editProductPrice);
                        resetAndDisableInput($editProductBrand);
                        resetInput($editVisibleProductSubcategory.get(0));
                        resetInput($editVisibleProductPlatform.get(0));
                        $editProductBtn.attr('disabled', '');
                        $deleteProductBtn.attr('disabled', '');
                        $editProductResponse.removeClass('error')
                        $editProductResponse.html('Producto eliminado con éxito.').addClass('success');
                    } else {
                        $editProductResponse.removeClass('success')
                        $editProductResponse.html('No se pudo eliminar el producto.').addClass('error');
                    }
                },
            });
        });

        const $videoURL = $('#edit-product-video');
        const $videoForm = $('#add-video-form');
        const $videosTableBody = $('#videos-table tbody');
        const $addVideoBtn = $('#add-video-btn');
        const $deleteVideoBtn = $('#delete-video-btn');
        const $deleteVideoId = $('#delete-video-id');
        const $deleteVideoConfirmBtn = $('#delete-video-confirm-btn');
        const $deleteVideoCancelBtn = $('#delete-video-cancel-btn');
        const $deleteVideoPreview = $('#delete-video-preview')
        const $saveVideosChangesBtn = $('#add-table-videos-btn');

        $videoForm.on('submit', function (e) {
            e.preventDefault();
            if (checkNewVideoOnSubmit($videoURL.get(0))) {
                if (!videoExistsInTable($videoURL.val(), $videosTableBody.get(0))) {
                    $.ajax({
                        url: '/api/agregar_video',
                        type: 'POST',
                        headers: {'X-CSRFToken': csrftoken, 'Authorization': 'Token ' + sessiontoken},
                        mode: 'same-origin',
                        data: {
                            'url': $videoURL.val(),
                            'producto': product.id,
                        },
                        success: function (response) {
                            fillVideosTable($videosTableBody, product.id, $saveVideosChangesBtn, $deleteVideoBtn, $deleteVideoId, $deleteVideoPreview);
                        },
                        error: function (response) {
                            if (response.status === 400) {
                                console.log('sale mal')
                            }
                        }
                    });
                } else {
                    setErrorFor($videoURL.get(0), 'Este video ya está en la tabla')
                }
            }
        });

        $saveVideosChangesBtn.on('click', function () {
            let rowsCount = $videosTableBody.get(0).rows.length;
            if (rowsCount > 0) {
                for (let i = 0; i < rowsCount; i += 1) {
                    let row = $videosTableBody.get(0).rows[i];
                    let newUrl = row.cells[1].firstElementChild.value;
                    let status = '<i class="fa-solid fa-equals" ' +
                        'style="font-size: 24px; color: #2E2E2E" ' +
                        'title="Sin cambios."></i>';
                    let currentUrl = row.cells[4].innerHTML;
                    if (newUrl !== currentUrl) {
                        if (checkEditVideoOnSubmit(row.cells[1].firstElementChild)) {
                            $.ajax({
                                url: '/api/modificar_video/' + row.cells[5].innerHTML,
                                type: 'PUT',
                                headers: {'X-CSRFToken': csrftoken, 'Authorization': 'Token ' + sessiontoken},
                                mode: 'same-origin',
                                data: {
                                    'url': newUrl,
                                    'producto': product.id,
                                },
                                success: function (response) {
                                    status = '<i class="fa-solid fa-check" ' +
                                        'style="font-size: 24px; color: #66CC33"></i>';
                                    row.cells[2].firstElementChild.setAttribute('src', newUrl);
                                    row.cells[4].innerHTML = newUrl;
                                    row.cells[3].innerHTML = status;
                                },
                                error: function (response, textStatus, errorThrown) {
                                    status = '<i class="fa-solid fa-circle-exclamation" ' +
                                        'style="font-size: 24px; color: #f93154" ' +
                                        'title="' + errorThrown + '"></i>';
                                    row.cells[1].value = currentUrl;
                                    row.cells[3].innerHTML = status;
                                }
                            });
                        }
                    } else {
                        row.cells[3].innerHTML = status;
                    }
                }
            }
        });

        $deleteVideoConfirmBtn.on('click', function () {
            $.ajax({
                url: '/api/modificar_video/' + $deleteVideoId.val(),
                type: 'DELETE',
                headers: {'X-CSRFToken': csrftoken, 'Authorization': 'Token ' + sessiontoken},
                mode: 'same-origin',
                success: function (response) {
                    fillVideosTable($videosTableBody, product.id, $saveVideosChangesBtn, $deleteVideoBtn, $deleteVideoId, $deleteVideoPreview);
                    $deleteVideoCancelBtn.click()
                },
                error: function (response) {
                    if (response.status === 400) {
                        console.log('sale mal')
                    }
                }
            });
        })

        // Nueva unidad
        const $newUnitSearch = $('#new-unit-search');
        const $newUnitForm = $('#new-unit-form');
        const $newUnitId = $('#new-unit-id');
        const $newUnitTableBody = $('#new-unit-table tbody');
        const $addUnitBtn = $('#add-unit-btn');
        const $removeNewTableUnitsBtn = $('#remove-new-table-units-btn');
        const $newUnitTHeadCbx = $('#new-unit-thead-check');
        const $addTableUnitsBtn = $('#add-table-units-btn');

        $newUnitSearch.autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: '?search=' + request.term,
                    type: 'POST',
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    data: {
                        'action': 'autocomplete',
                        'term': request.term,
                    },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return {
                                value: item.buscar,
                                'id': item.id,
                            }
                        }));
                    },
                });
            },
            delay: 0,
            minLength: 2,
            select: function (event, ui) {
                fillInput($newUnitSearch, ui.item.value);
                product = ui.item;
                $addUnitBtn.removeAttr("disabled");
                return false;
            }
        });

        $newUnitForm.on('submit', function (e) {
            if (checkNewUnitInputsOnSubmit($newUnitId.get(0))) {
                if (!unitExistsInTable($newUnitId.val(), $newUnitTableBody.get(0))) {
                    if (!unitExists($newUnitId.val())) {
                        let row = '<tr><th scope="row"><div class="form-check"><input class="form-check-input" ' +
                            'type="checkbox" value=""</div></th>' +
                            '<td>' + $newUnitId.val() + '</td><td>' + product.id + '</td>' +
                            '<td>' + product.value + '</td><td></td></tr>';
                        $newUnitTableBody.append(row);
                        $removeNewTableUnitsBtn.removeAttr("disabled");
                        $addTableUnitsBtn.removeAttr("disabled");
                    } else {
                        setErrorFor($newUnitId.get(0), 'Este UPC ya está registrado')
                    }
                } else {
                    setErrorFor($newUnitId.get(0), 'Este UPC ya está en la tabla')
                }
            }
            e.preventDefault();
        });

        $newUnitTHeadCbx.on('change', function () {
            checkOrUncheckAllUnitsInTable($newUnitTableBody.get(0), this);
        });

        $addTableUnitsBtn.on('click', function () {
            let rowsCount = $newUnitTableBody.get(0).rows.length;
            if (rowsCount > 0) {
                for (let i = 0; i < rowsCount; i += 1) {
                    let row = $newUnitTableBody.get(0).rows[i];
                    let id = row.cells[1].innerText;
                    let producto = row.cells[2].innerText;
                    $.ajax({
                        url: '',
                        type: 'POST',
                        headers: {'X-CSRFToken': csrftoken},
                        mode: 'same-origin',
                        data: {
                            'action': 'newUnit',
                            'id': id,
                            'producto': producto,
                        },
                        success: function (response) {
                            let status;
                            if (JSON.parse(response['success'])) {
                                status = '<i class="fa-solid fa-check" ' +
                                    'style="font-size: 24px; color: #66CC33"></i>';
                            } else {
                                status = '<i class="fa-solid fa-circle-exclamation" ' +
                                    'style="font-size: 24px; color: #f93154" ' +
                                    'title="' + JSON.parse(JSON.stringify(response['errors'])) + '"></i>';
                            }
                            row.cells[4].innerHTML = status;
                        },
                    });
                }
            }
        });

        $removeNewTableUnitsBtn.on('click', function () {
            if ($newUnitTableBody.get(0).rows.length !== 0) {
                let rowsCount = $newUnitTableBody.get(0).rows.length;
                let rowsRemoved = 0;
                $('#new-unit-table tbody tr').each(function () {
                    let checked = false;
                    $(this).find('input').each(function () {
                        if ($(this).get(0).checked) {
                            checked = true;
                        }
                    })
                    if (checked) {
                        $(this).remove();
                        rowsRemoved += 1;
                    }
                })
                if (rowsCount === rowsRemoved) {
                    $removeNewTableUnitsBtn.attr('disabled', 'true');
                    $addTableUnitsBtn.attr('disabled', 'true');
                }
            }
        });

        const $editUnitSearch = $('#edit-unit-search');
        const $editUnitTableBody = $('#edit-unit-table tbody');
        const $editUnitForm = $('#edit-unit-form');
        const $editUnitBtn = $('#edit-unit-btn');
        const $saveEditedUnitsBtn = $('#save-edited-units-btn');
        const $editUnitId = $('#edit-unit-id');

        $editUnitSearch.autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: '?search=' + request.term,
                    type: 'POST',
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    data: {
                        'action': 'autocomplete',
                        'term': request.term,
                    },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return {
                                value: item.buscar,
                                'id': item.id,
                            }
                        }));
                    },
                });
            },
            delay: 0,
            minLength: 2,
            select: function (event, ui) {
                fillInput($editUnitSearch, ui.item.value);
                fillEditUnitsTable($editUnitTableBody, ui.item.id, $saveEditedUnitsBtn, $editUnitBtn, $editUnitId);
                product = ui.item;
                return false;
            }
        });

        $editUnitForm.on('submit', function (e) {
            e.preventDefault();
            if (checkNewUnitInputsOnSubmit($editUnitId.get(0))) {
                if (!unitExistsInTable($editUnitId.val(), $editUnitTableBody.get(0))) {
                    if (!unitExists($editUnitId.val())) {
                        let rowNumber = $('input[name="editUnitRadioBtn"]:checked').val();
                        let row = $editUnitTableBody.get(0).rows[rowNumber];
                        row.cells[1].innerText = $editUnitId.val();
                    } else {
                        setErrorFor($editUnitId.get(0), 'Este UPC ya está registrado')
                    }
                } else {
                    setErrorFor($editUnitId.get(0), 'Este UPC ya está en la tabla')
                }
            }
        });

        $saveEditedUnitsBtn.on('click', function () {
            let rowsCount = $editUnitTableBody.get(0).rows.length;
            if (rowsCount > 0) {
                for (let i = 0; i < rowsCount; i += 1) {
                    let row = $editUnitTableBody.get(0).rows[i];
                    let newId = row.cells[1].innerText;
                    let status = '<i class="fa-solid fa-equals" ' +
                        'style="font-size: 24px; color: #2E2E2E" ' +
                        'title="Sin cambios."></i>';
                    let currentId = row.cells[4].innerText;
                    if (newId !== currentId) {
                        $.ajax({
                            url: '',
                            type: 'POST',
                            headers: {'X-CSRFToken': csrftoken},
                            mode: 'same-origin',
                            data: {
                                'action': 'editUnit',
                                'newId': newId,
                                'currentId': currentId,
                            },
                            success: function (response) {
                                if (JSON.parse(response['success'])) {
                                    status = '<i class="fa-solid fa-check" ' +
                                        'style="font-size: 24px; color: #66CC33"></i>';
                                    row.cells[4].innerHTML = newId;
                                } else {
                                    status = '<i class="fa-solid fa-circle-exclamation" ' +
                                        'style="font-size: 24px; color: #f93154" ' +
                                        'title="' + JSON.parse(JSON.stringify(response['errors'])) + '"></i>';
                                }
                                row.cells[3].innerHTML = status;
                            },
                        });
                    } else {
                        row.cells[3].innerHTML = status;
                    }
                }
            }
        });

        // Nueva marca
        const $newBrandResponse = $('#new-brand-response');
        const $newBrandName = $('#new-brand-name');
        const $newBrandBtn = $('#new-product-brand-confirm-btn');
        const $newBrandForm = $('#new-product-brand-form');
        const $newBrandCancelBtn = $('#new-product-brand-cancel-btn');

        $newBrandBtn.on('click', function (e) {
            if (checkNewBrandSubcategoryOrPlatformInputsOnSubmit($newBrandName.get(0))) {
                if (!brandExists($newBrandName.val())) {
                    formData = new FormData($newBrandForm.get(0));
                    formData.append('action', 'newBrand');
                    $.ajax({
                        url: '',
                        type: 'POST',
                        headers: {'X-CSRFToken': csrftoken},
                        mode: 'same-origin',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            if (JSON.parse(response['success'])) {
                                $newBrandResponse.removeClass('error')
                                $newBrandResponse.html('Marca agregada con éxito.').addClass('success');
                            } else {
                                $newBrandResponse.removeClass('success')
                                $newBrandResponse.html('No se pudo agregar la marca.').addClass('error');
                            }
                        }
                    })
                } else {
                    $newBrandResponse.removeClass('success');
                    $newBrandResponse.html('La marca que intentas agregar ya existe.').addClass('error');
                }
            }
            e.preventDefault();
        });

        $newBrandCancelBtn.on('click', function () {
            $newBrandResponse.html('');
            $newBrandForm.get(0).reset();
        });

        // Nueva subcategoría
        const $newSubcategoryResponse = $('#new-subcategory-response');
        const $newSubcategoryId = $('#new-subcategory-id');
        const $newSubcategoryName = $('#new-subcategory-name');
        const $newSubcategoryCategory = $('#new-subcategory-category');
        const $newSubcategoryBtn = $('#new-product-subcategory-confirm-btn');
        const $newSubcategoryForm = $('#new-product-subcategory-form');
        const $newSubcategoryCancelBtn = $('#new-product-subcategory-cancel-btn');

        $newSubcategoryBtn.on('click', function (e) {
            if (checkNewSubcategoryInputsOnSubmit($newSubcategoryId.get(0), $newSubcategoryName.get(0), $newSubcategoryCategory.get(0))) {
                if (!subcategoryExists($newSubcategoryId.val(), $newSubcategoryName.val(),
                    $newSubcategoryCategory.val())) {
                    formData = new FormData($newSubcategoryForm.get(0));
                    formData.append('action', 'newSubcategory');
                    $.ajax({
                        url: '',
                        type: 'POST',
                        headers: {'X-CSRFToken': csrftoken},
                        mode: 'same-origin',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            if (JSON.parse(response['success'])) {
                                $newSubcategoryResponse.removeClass('error')
                                $newSubcategoryResponse.html('Subcategoría agregada con éxito.').addClass('success');
                            } else {
                                $newSubcategoryResponse.removeClass('success')
                                $newSubcategoryResponse.html('No se pudo agregar la subcategoría.').addClass('error');
                                console.log(response)
                            }
                        }
                    })
                } else {
                    $newSubcategoryResponse.removeClass('success');
                    $newSubcategoryResponse.html('La subcategoría que intentas agregar ya existe.').addClass('error');
                }
            }
            e.preventDefault();
        });

        $newSubcategoryCancelBtn.on('click', function () {
            $newSubcategoryResponse.html('');
            $newSubcategoryForm.get(0).reset();
        });

        // Nueva plataforma
        const $newPlatformResponse = $('#new-platform-response');
        const $newPlatformId = $('#new-platform-id');
        const $newPlatformName = $('#new-platform-name');
        const $newPlatformBtn = $('#new-product-platform-confirm-btn');
        const $newPlatformForm = $('#new-product-platform-form');
        const $newPlatformCancelBtn = $('#new-product-platform-cancel-btn');

        $newPlatformBtn.on('click', function (e) {
            if (checkNewPlatformInputsOnSubmit($newPlatformId.get(0), $newPlatformName.get(0))) {
                if (!platformExists($newPlatformId.val())) {
                    formData = new FormData($newPlatformForm.get(0));
                    formData.append('action', 'newPlatform');
                    $.ajax({
                        url: '',
                        type: 'POST',
                        headers: {'X-CSRFToken': csrftoken},
                        mode: 'same-origin',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            if (JSON.parse(response['success'])) {
                                $newPlatformResponse.removeClass('error')
                                $newPlatformResponse.html('Plataforma agregada con éxito.').addClass('success');
                            } else {
                                $newPlatformResponse.removeClass('success')
                                $newPlatformResponse.html('No se pudo agregar la plataforma.').addClass('error');
                                console.log(response)
                            }
                        }
                    })
                } else {
                    $newPlatformResponse.removeClass('success');
                    $newPlatformResponse.html('La plataforma que intentas agregar ya existe.').addClass('error');
                }
            }
            e.preventDefault();
        });

        $newPlatformCancelBtn.on('click', function () {
            $newPlatformResponse.html('');
            $newPlatformForm.get(0).reset();
        });
    });
}

if (body.classList.contains('checkout')) {
    console.log('checkout')

    $(document).ready(function () {
        checkoutCartFunctions()
    });
}

if (body.classList.contains('payment')) {
    console.log('payment')

    $(document).ready(function () {
        checkoutPaymentFunctions();
    });
}

if (body.classList.contains('confirmation')) {
    console.log('confirmation')

    $(document).ready(function () {
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

function checkRegisterInputsOnSubmit(registerEmail, registerPassword, passwordStrengthIndicator, registerName, registerLastName) {
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
    } else if (!checkPasswordStrength(registerPassword, passwordStrengthIndicator)) {
        setErrorFor(registerPassword, 'La contraseña no cumple con los requisitos');
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

function checkContactInputsOnSubmit(contactEmail, contactMessage, contactSelect) {
    //get values from the inputs
    const emailValue = contactEmail.value.trim();
    const messageValue = contactMessage.value.trim();
    const selectValue = contactSelect.value.trim();

    if (selectValue === '') {
        setErrorFor(contactSelect, 'Por favor seleccione un tipo de consulta');
    } else {
        setSuccessFor(contactSelect);
    }

    if (emailValue === '') {
        //add error class
        setErrorFor(contactEmail, 'Por favor ingrese un email');
    } else if (!isEmail(emailValue)) {
        setErrorFor(contactEmail, 'Por favor ingrese un email válido');
    } else {
        //add success class
        setSuccessFor(contactEmail);
    }

    if (messageValue === '') {
        setErrorFor(contactMessage, 'Por favor ingrese un mensaje');
    } else {
        setSuccessFor(contactMessage);
    }

    return checkSuccess(contactEmail) && checkSuccess(contactMessage) && checkSuccess(contactSelect);
}

function checkNewProductInputsOnSubmit(newName, newImg, newDate, newPrice, newBrand, newSubcategory, newPlatform) {
    //get values from the inputs
    const nameValue = newName.value.trim();
    const imgValue = newImg.value.trim();
    const dateValue = newDate.value.trim();
    const priceValue = newPrice.value.trim();
    const brandValue = newBrand.value.trim();
    const subcategoryValue = newSubcategory.value.trim();
    const platformValue = newPlatform.value.trim();
    let imgSuccess = true;

    if (nameValue === '') {
        setErrorFor(newName, 'Por favor ingrese un nombre');
    } else {
        setSuccessFor(newName);
    }

    if (imgValue === '' || imgValue === null) {
        newImg.classList.remove('error');
        newImg.classList.add('error');
        imgSuccess = false;
    }

    if (dateValue === '') {
        setErrorFor(newDate, 'Por favor seleccione una fecha');
    } else {
        setSuccessFor(newDate);
    }

    if (priceValue === '') {
        setErrorFor(newPrice, 'Por favor ingrese el precio');
    } else {
        setSuccessFor(newPrice);
    }

    if (brandValue === '') {
        setErrorFor(newBrand, 'Por favor seleccione una marca');
    } else {
        setSuccessFor(newBrand);
    }

    if (subcategoryValue === '') {
        setErrorFor(newSubcategory, 'Por favor seleccione una subcategoría');
    } else {
        setSuccessFor(newSubcategory);
    }

    if (platformValue === '') {
        setErrorFor(newPlatform, 'Por favor seleccione una plataforma');
    } else {
        setSuccessFor(newPlatform);
    }

    return checkSuccess(newName) && imgSuccess && checkSuccess(newDate) && checkSuccess(newPrice) &&
        checkSuccess(newBrand) && checkSuccess(newSubcategory) && checkSuccess(newPlatform);
}

function checkEditProductInputsOnSubmit(editName, editDate, editPrice, editBrand) {
    //get values from the inputs
    const nameValue = editName.value.trim();
    const dateValue = editDate.value.trim();
    const priceValue = editPrice.value.trim();
    const brandValue = editBrand.value.trim();

    if (nameValue === '') {
        setErrorFor(editName, 'Por favor ingrese un nombre');
    } else {
        setSuccessFor(editName);
    }

    if (dateValue === '') {
        setErrorFor(editDate, 'Por favor seleccione una fecha');
    } else {
        setSuccessFor(editDate);
    }

    if (priceValue === '') {
        setErrorFor(editPrice, 'Por favor ingrese el precio');
    } else {
        setSuccessFor(editPrice);
    }

    if (brandValue === '') {
        setErrorFor(editBrand, 'Por favor seleccione una marca');
    } else {
        setSuccessFor(editBrand);
    }

    return checkSuccess(editName) && checkSuccess(editDate) && checkSuccess(editPrice) && checkSuccess(editBrand);
}

function checkNewBrandSubcategoryOrPlatformInputsOnSubmit(name) {
    //get values from the inputs
    const nameValue = name.value.trim();

    if (nameValue === '') {
        //add error class
        setErrorFor(name, 'Por favor ingrese un nombre');
    } else {
        //add success class
        setSuccessFor(name);
    }

    return checkSuccess(name);
}

function checkNewSubcategoryInputsOnSubmit(id, name, category) {
    //get values from the inputs
    const idValue = id.value.trim();
    const nameValue = name.value.trim();
    const categoryValue = category.value.trim();

    if (idValue === '') {
        //add error class
        setErrorFor(id, 'Por favor ingrese un ID');
    } else {
        //add success class
        setSuccessFor(id);
    }
    if (nameValue === '') {
        //add error class
        setErrorFor(name, 'Por favor ingrese un nombre');
    } else {
        //add success class
        setSuccessFor(name);
    }

    if (categoryValue === '') {
        //add error class
        setErrorFor(category, 'Por favor seleccione una categoría');
    } else {
        //add success class
        setSuccessFor(category);
    }

    return checkSuccess(id) && checkSuccess(name) && checkSuccess(category);
}

function checkNewPlatformInputsOnSubmit(id, name) {
    //get values from the inputs
    const idValue = id.value.trim();
    const nameValue = name.value.trim();

    if (idValue === '') {
        //add error class
        setErrorFor(id, 'Por favor ingrese un ID');
    } else {
        //add success class
        setSuccessFor(id);
    }

    if (nameValue === '') {
        //add error class
        setErrorFor(name, 'Por favor ingrese un nombre');
    } else {
        //add success class
        setSuccessFor(name);
    }

    return checkSuccess(id) && checkSuccess(name);
}

function checkNewUnitInputsOnSubmit(id) {
    //get values from the inputs
    const idValue = id.value.trim();
    let regExp = /[a-zA-Z]/g;

    if (idValue === '') {
        //add error class
        setErrorFor(id, 'Por favor ingrese un UPC');
    } else if (idValue.length !== 12 || regExp.test(idValue) || idValue.startsWith('0')) {
        setErrorFor(id, 'Por favor ingrese un UPC válido');
    } else {
        //add success class
        setSuccessFor(id);
    }

    return checkSuccess(id);
}

function checkNewVideoOnSubmit(url) {
    //get values from the inputs
    const urlValue = url.value.trim();
    let regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/

    if (urlValue === '') {
        //add error class
        const errorMessage = url.querySelector('div.invalid-feedback')

        //add error message inside container
        errorMessage.innerText = message;


        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
        input.classList.add('is-invalid');
        setErrorFor(url, 'Por favor ingrese un URL de Youtube');
    } else if (!regExp.test(urlValue)) {
        setErrorFor(url, 'Por favor ingrese un URL de Youtube válido');
    } else {
        //add success class
        setSuccessFor(url);
    }

    return checkSuccess(url);
}

function checkEditVideoOnSubmit(url) {
    //get values from the inputs
    const urlValue = url.value.trim();
    const errorMessage = url.parentElement.querySelector('div.invalid-feedback')
    let regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    let success = true;

    if (urlValue === '') {
        errorMessage.innerText = 'Por favor ingrese un URL de Youtube';
        url.classList.remove('is-invalid');
        url.classList.add('is-invalid');
        success = false;
    } else if (!regExp.test(urlValue)) {
        errorMessage.innerText = 'Por favor ingrese un URL de Youtube válido';
        url.classList.remove('is-invalid');
        url.classList.add('is-invalid');
        success = false;
    } else {
        url.classList.remove('is-invalid');
    }
    return success;
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

    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.classList.add('is-invalid');
}

function setSuccessFor(input) {
    const formOutline = input.parentElement;
    formOutline.className = 'form-outline success';

    input.classList.remove('is-invalid');
}

function setPostSuccessFor(input, message) {
    const formOutline = input.parentElement;
    const successMessage = formOutline.querySelector('div.valid-feedback')

    successMessage.innerText = message;

    formOutline.className = 'form-outline success';

    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

function resetInput(input) {
    const formOutline = input.parentElement;
    formOutline.className = 'form-outline';

    input.classList.remove('is-invalid');
    input.classList.remove('is-valid');
}

function resetAndDisableInput($input) {
    $input.val('');
    $input.removeClass('active');
    $input.removeClass('is-invalid');
    $input.removeClass('is-valid');
    $input.attr('disabled', true);
}

function fillInput($input, value) {
    $input.val(value);
    $input.addClass('active');
}

function fillAndEnableInput($input, value) {
    $input.val(value);
    $input.addClass('active');
    $input.removeAttr('disabled');
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function checkPasswordStrength(password, passwordStrengthIndicator) {
    let passwordValue = password.value.trim();
    let strengthCount = 0;
    let hasLength = false;
    const $lengthPolicyCheck = $('#length-policy i');
    const $numberPolicyCheck = $('#number-policy i');
    const $uppercasePolicyCheck = $('#uppercase-policy i');
    const $lowercasePolicyCheck = $('#lowercase-policy i');
    const $pwPolicies = $('#pw-policies');

    //If password length is between 8-20
    if (passwordValue.length > 7 && passwordValue.length < 21) {
        $($lengthPolicyCheck).css('visibility', 'visible');
        hasLength = true;
    } else {
        $($lengthPolicyCheck).css('visibility', 'hidden');
    }

    //If password contains any lowercase character
    if (passwordValue.match(/([a-z])/)) {
        $($lowercasePolicyCheck).css('visibility', 'visible');
        strengthCount += 1;
    } else {
        $($lowercasePolicyCheck).css('visibility', 'hidden');
    }

    //If password contains any uppercase character
    if (passwordValue.match(/([A-Z])/)) {
        $($uppercasePolicyCheck).css('visibility', 'visible');
        strengthCount += 1;
    } else {
        $($uppercasePolicyCheck).css('visibility', 'hidden');
    }

    //If password contains any number character
    if (passwordValue.match(/([0-9])/)) {
        $($numberPolicyCheck).css('visibility', 'visible');
        strengthCount += 1;
    } else {
        $($numberPolicyCheck).css('visibility', 'hidden');
    }

    if (passwordValue !== '') {
        if (hasLength) {
            if (strengthCount === 1) {
                resetPasswordStrength(passwordStrengthIndicator);
                passwordStrengthIndicator.classList.add('weak');
                passwordStrengthIndicator.style = "width: 66.6%";
            } else if (strengthCount >= 2) {
                resetPasswordStrength(passwordStrengthIndicator);
                passwordStrengthIndicator.classList.add('good');
                passwordStrengthIndicator.style = "width: 100%";
                $($pwPolicies).slideUp(400);
                return true;
            }
        } else {
            resetPasswordStrength(passwordStrengthIndicator);
            passwordStrengthIndicator.classList.add('very-weak');
            passwordStrengthIndicator.style = "width: 33.3%";
        }
    } else {
        resetPasswordStrength(passwordStrengthIndicator);
    }

    $($pwPolicies).slideDown(400);
    return false;
}

function resetPasswordStrength(passwordStrengthIndicator) {
    passwordStrengthIndicator.classList.remove('very-weak');
    passwordStrengthIndicator.classList.remove('weak');
    passwordStrengthIndicator.classList.remove('good');
    passwordStrengthIndicator.style.width = '0';
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
function sidebarMenuFunctions() {
    const $sidebar = $('#sidebar');
    const $sidebarContainer = $('#sidebar-container');
    const $subcategories = $(".subcategories")
    const $categoriesBtns = $('.category-btn')
    const categoriesShowIcons = document.getElementsByClassName('show-icon')

    $('#sidebar-open-btn').on('click', function () {
        $sidebarContainer.show();
        $('body').css('overflow', 'hidden');
        $sidebar.show("slide", 300);
    });

    $('#sidebar-close-btn').on('click', function () {
        $sidebarContainer.hide("fade", 300);
        $sidebar.hide("slide", 300);
        $('body').css('overflow', 'auto');

        for (let i = 0; i < categoriesShowIcons.length; i++) {
            if (categoriesShowIcons[i].classList.contains('hide')) {
                toggleCategoryShow($subcategories.eq(i), categoriesShowIcons[i]);
            }
        }
    });

    $('#sidebar-bg').on('click', function () {
        $('#sidebar-close-btn').click();
    });

    for (let i = 0; i < $categoriesBtns.length; i++) {
        $categoriesBtns.eq(i).on('click', function () {
            toggleCategoryShow($subcategories.eq(i), categoriesShowIcons[i]);
        });
    }
}

//Sidebar carrito
function cartSidebarFunctions() {
    const csrftoken = getCookie('csrftoken');
    const $cartSidebarBody = $('#cart-sidebar-body');
    const $cartSidebarOpenBtn = $('#cart-sidebar-open-btn');
    const $cartProductCount = $('#cart-product-count');
    const $cartTotal = $('#cart-total');
    const $sidebar = $('#cart-sidebar');
    const $sidebarContainer = $('#cart-sidebar-container');
    const $cartSidebarScroll = $('#cart-sidebar-scroll');

    $cartSidebarOpenBtn.on('click', function () {
        $sidebarContainer.show();
        $('body').css('overflow', 'hidden');
        $sidebar.show("slide", {direction: "right"}, 300);
    });

    $('#cart-sidebar-close-btn').on('click', function () {
        $sidebarContainer.hide("fade", 300);
        $sidebar.hide("slide", {direction: "right"}, 300);
        $cartSidebarScroll.scrollTop($cartSidebarScroll.prop("scrollHeight"));
        $('body').css('overflow', 'auto');
    });

    $('#cart-sidebar-bg').on('click', function () {
        $('#cart-sidebar-close-btn').click();
    });

    let emptyCart = document.createElement("p");
    emptyCart.className = 'pt-3';
    emptyCart.setAttribute('name', 'cartEmpty')
    emptyCart.innerHTML = 'No hay articulos en tu carrito.'

    $.ajax({
        url: '/api/cart',
        type: 'GET',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        success: function (response) {
            let idCarrito = JSON.parse(response['id'])
            let subtotal = JSON.parse(response['subtotal'])

            $('input[name="carrito"]').each(function () {
                let idProducto = $(this).parent().siblings('input[name="idProducto"]').val()
                $(this).val(idCarrito);
                $(this).siblings('input[name="producto"]').val(idProducto)
            });

            let productCount = response['productos'].length;

            if (productCount === 0) {
                $cartSidebarBody.append(emptyCart);
                $cartProductCount.html('')
            } else {
                $cartProductCount.html(productCount)
                $(response['productos']).each(function () {
                    let idProducto = JSON.parse(JSON.stringify(this['producto']))
                    let idCarrito = JSON.parse(JSON.stringify(this['carrito']))
                    let url = JSON.parse(JSON.stringify(this['url']))
                    let nombre = JSON.parse(JSON.stringify(this['nombre']))
                    let imagen = JSON.parse(JSON.stringify(this['imagen']))
                    let cantidad = JSON.parse(this['cantidad'])
                    let total = JSON.parse(this['total']);

                    let card = cartItemGenerator(idProducto, idCarrito, nombre, imagen, total, url, cantidad)
                    $cartSidebarBody.append(card);
                });
                $cartTotal.html(subtotal)
            }
        },
        error: function (response) {
            if (response.status === 400) {
                console.log('sale mal')
            }
        }
    });

    $('form[name="addToCartForm"]').on('submit', function (e) {
        e.preventDefault();
        const $addToCartBtnMsg = $(this).children('button[type="submit"]').children('span')
        message = $addToCartBtnMsg.html()
        $addToCartBtnMsg.html('')
        $addToCartBtnMsg.addClass('spinner-border spinner-border-sm')
        $.ajax({
            url: '/api/add_to_cart',
            type: 'POST',
            headers: {'X-CSRFToken': csrftoken},
            data: $(this).serialize(),
            mode: 'same-origin',
            success: function (response) {
                let idProducto = JSON.parse(JSON.stringify(response['producto']))
                let cantidad = JSON.parse(response['cantidad'])
                let total = JSON.parse(response['total']);
                let carritoSubtotal = JSON.parse(response['subtotalCarrito'])
                let carritoTotal = JSON.parse(response['totalCarrito'])

                emptyCart.remove()

                let exists = false;
                $cartSidebarBody.children('.cart-item').each(function () {
                    if ($(this).find('p[name="cartProductId"]').html().includes(idProducto)) {
                        $(this).find('h5[name="cartProductTotal"]').html('$' + total);
                        $(this).find('span[name="cartProductQty"]').html(cantidad);
                        $cartSidebarOpenBtn.click();
                        exists = true;
                    }
                });

                if (!exists) {
                    let idCarrito = JSON.parse(JSON.stringify(response['carrito']))
                    let url = JSON.parse(JSON.stringify(response['url']))
                    let nombre = JSON.parse(JSON.stringify(response['nombre']))
                    let imagen = JSON.parse(JSON.stringify(response['imagen']))

                    let card = cartItemGenerator(idProducto, idCarrito, nombre, imagen, total, url, cantidad)
                    $cartSidebarBody.append(card);

                    let productCount = $cartProductCount.html();

                    if (productCount === '') {
                        $cartProductCount.html(1)
                    } else {
                        $cartProductCount.html(parseInt(productCount) + 1)
                    }
                    $cartSidebarOpenBtn.click();
                    $cartSidebarScroll.animate({scrollTop: $cartSidebarScroll.prop('scrollHeight')}, 1000);
                }

                $cartTotal.html(carritoSubtotal)
                $addToCartBtnMsg.removeClass('spinner-border spinner-border-sm')
                $addToCartBtnMsg.html(message)
            },
            error: function (response) {
                if (response.status === 400) {
                    console.log('sale mal')
                }
                $addToCartBtnMsg.removeClass('spinner-border spinner-border-sm')
                $addToCartBtnMsg.html(message)
            }
        });
    });

    function cartItemGenerator(id, carrito, nombre, imagen, total, url, cantidad) {
        let img = document.createElement("img");
        img.setAttribute('src', imagen);
        img.setAttribute('alt', nombre);
        img.className = 'card-img-top img-fluid';

        let col1 = document.createElement("a");
        col1.setAttribute('href', url)
        col1.className = 'col-5 align-self-center';
        col1.appendChild(img);

        let productId = document.createElement("p");
        productId.className = 'item-platform text-center'
        productId.setAttribute('name', 'cartProductId');
        productId.innerHTML = 'SKU: ' + id;

        let title = document.createElement("a");
        title.setAttribute('href', url);
        title.innerHTML = nombre;

        let titleWrapper = document.createElement("div");
        title.className = 'item-title-wrapper text-center';
        titleWrapper.appendChild(title);

        let price = document.createElement("h5");
        price.className = 'text-center';
        price.setAttribute('name', 'cartProductTotal');
        price.innerHTML = '$' + total;

        let btn1Icon = document.createElement("i");
        btn1Icon.className = 'fa-solid fa-minus';

        let btn1 = document.createElement("button");
        btn1.className = 'btn custom-btn2 p-0';
        btn1.setAttribute('type', 'button');
        btn1.appendChild(btn1Icon);

        btn1.addEventListener("click", function () {
            let cantidadActual = parseInt(qtyNumber.innerHTML);
            btn1Icon.className = 'spinner-border spinner-border-sm';
            if (cantidadActual > 1) {
                $.ajax({
                    url: '/api/update_cart/' + carrito + '/' + id,
                    type: 'PUT',
                    data: {
                        'carrito': carrito,
                        'producto': id,
                        'cantidad': cantidadActual - 1
                    },
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    success: function (response) {
                        qtyNumber.innerHTML = JSON.parse(response['cantidad']);
                        let total = JSON.parse(response['total'])
                        let carritoSubtotal = JSON.parse(response['subtotalCarrito'])
                        price.innerHTML = '$' + total

                        $cartTotal.html(carritoSubtotal)
                        btn1Icon.className = 'fa-solid fa-minus';
                    },
                    error: function (response) {
                        if (response.status === 400) {
                            console.log('sale mal')
                        }
                        btn1Icon.className = 'fa-solid fa-minus';
                    }
                });
            }
        });

        let qtyNumber = document.createElement("span");
        qtyNumber.className = 'col';
        qtyNumber.setAttribute('name', 'cartProductQty');
        qtyNumber.innerHTML = cantidad;

        $('body').on("DOMSubtreeModified", qtyNumber, function () {
            if (parseInt(qtyNumber.innerHTML) === 1) {
                btn1.setAttribute('disabled', true);
            } else if (parseInt(qtyNumber.innerHTML) === 10) {
                btn2.setAttribute('disabled', true);
            } else {
                btn1.removeAttribute('disabled');
                btn2.removeAttribute('disabled');
            }
        });

        let qty = document.createElement("div");
        qty.className = 'product-qty row gx-0 align-items-center';
        qty.appendChild(qtyNumber);

        let btn2Icon = document.createElement("i");
        btn2Icon.className = 'fa-solid fa-plus';

        let btn2 = document.createElement("button");
        btn2.className = 'btn custom-btn2 p-0';
        btn2.setAttribute('type', 'button');
        btn2.appendChild(btn2Icon);

        btn2.addEventListener("click", function () {
            let cantidadActual = parseInt(qtyNumber.innerHTML);
            btn2Icon.className = 'spinner-border spinner-border-sm';
            if (cantidadActual < 10) {
                $.ajax({
                    url: '/api/update_cart/' + carrito + '/' + id,
                    type: 'PUT',
                    data: {
                        'carrito': carrito,
                        'producto': id,
                        'cantidad': cantidadActual + 1
                    },
                    headers: {'X-CSRFToken': csrftoken},
                    mode: 'same-origin',
                    success: function (response) {
                        qtyNumber.innerHTML = JSON.parse(response['cantidad']);
                        let total = JSON.parse(response['total'])
                        let carritoSubtotal = JSON.parse(response['subtotalCarrito'])
                        price.innerHTML = '$' + total

                        $cartTotal.html(carritoSubtotal)
                        btn2Icon.className = 'fa-solid fa-plus';
                    },
                    error: function (response) {
                        if (response.status === 400) {
                            console.log('sale mal')
                        }
                        btn2Icon.className = 'fa-solid fa-plus';
                    }
                });
            }
        });

        let buttonGroup = document.createElement("div");
        buttonGroup.className = 'btn-group col-auto';
        buttonGroup.setAttribute('role', 'group');
        buttonGroup.setAttribute('aria-label', 'Cantidad');
        buttonGroup.appendChild(btn1);
        buttonGroup.appendChild(qty);
        buttonGroup.appendChild(btn2);

        let delBtnIcon = document.createElement("i");
        delBtnIcon.className = 'fa-solid fa-trash';
        delBtnIcon.setAttribute('style', 'font-size: 20px; color: #FF4655;');

        let delBtn = document.createElement("button");
        delBtn.className = 'btn custom-btn1 p-0 col-auto';
        delBtn.setAttribute('type', 'button');
        delBtn.appendChild(delBtnIcon);

        delBtn.addEventListener("click", function () {
            delBtnIcon.className = 'spinner-border spinner-border-sm';
            $.ajax({
                url: '/api/update_cart/' + carrito + '/' + id,
                type: 'DELETE',
                headers: {'X-CSRFToken': csrftoken},
                mode: 'same-origin',
                success: function (response) {
                    card.remove();
                    let productCount = parseInt($cartProductCount.html())
                    if (productCount === 1) {
                        $cartProductCount.html('')
                    } else {
                        $cartProductCount.html(productCount - 1)
                    }

                    let delTotal = price.innerHTML.split('$')[1]
                    $cartTotal.html(parseInt($cartTotal.html()) - delTotal)

                    if ($cartSidebarBody.children().length === 0) {
                        $cartSidebarBody.append(emptyCart);
                    }
                    delBtnIcon.className = 'fa-solid fa-trash';
                },
                error: function (response) {
                    if (response.status === 400) {
                        console.log('sale mal')
                    }
                    delBtnIcon.className = 'fa-solid fa-trash';
                }
            });
        });

        let delBtnContainer = document.createElement("div");
        delBtnContainer.className = 'row gx-0 justify-content-center';
        delBtnContainer.appendChild(delBtn);

        let del = document.createElement("div");
        del.className = 'col-12 col-sm-auto ms-sm-auto';
        del.appendChild(delBtnContainer);

        let buttons = document.createElement("div");
        buttons.className = 'row gx-0 justify-content-center align-items-center gap-3 gap-sm-0';
        buttons.appendChild(buttonGroup);
        buttons.appendChild(del);

        let col2 = document.createElement("div");
        col2.className = "col-7 card-body ps-3";
        col2.appendChild(productId);
        col2.appendChild(titleWrapper);
        col2.appendChild(price);
        col2.appendChild(buttons);

        let row = document.createElement("div");
        row.className = "row gx-0";
        row.appendChild(col1);
        row.appendChild(col2);

        let card = document.createElement("div");
        card.className = "card cart-item";
        card.appendChild(row);

        return card;
    }
}

function checkoutCartFunctions() {
    const csrftoken = getCookie('csrftoken');
    const $cartItems = $('#cartItems');
    const $cartProductCount = $('#cart-product-count');
    const $cartSubtotal = $('#cart-subtotal');
    const $cartTotal = $('#cart-total');
    const $continueBtn = $('#continueBtn')

    emptyCart = document.createElement("p");
    emptyCart.setAttribute('id', 'cartEmpty')
    emptyCart.innerHTML = 'No hay artículos en tu carrito.'

    $.ajax({
        url: '/api/cart',
        type: 'GET',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        success: function (response) {
            let idCarrito = JSON.parse(response['id'])
            let subtotal = JSON.parse(response['subtotal'])
            let total = JSON.parse(response['total'])

            let productCount = response['productos'].length;
            let unitCount = 0;

            if (productCount === 0) {
                $cartItems.append(emptyCart)
                $continueBtn.addClass('disabled');
            } else {
                $(response['productos']).each(function () {
                    let idProducto = JSON.parse(JSON.stringify(this['producto']))
                    let idCarrito = JSON.parse(JSON.stringify(this['carrito']))
                    let nombre = JSON.parse(JSON.stringify(this['nombre']))
                    let imagen = JSON.parse(JSON.stringify(this['imagen']))
                    let cantidad = JSON.parse(this['cantidad'])
                    let precio = JSON.parse(this['precio']);

                    let card = cartItemGenerator(idProducto, idCarrito, nombre, imagen, precio, cantidad)
                    $cartItems.append(card)
                    unitCount += cantidad;
                });
            }

            $cartProductCount.html('Productos (' + unitCount + ')');
            $cartSubtotal.html('$' + subtotal)
            $cartTotal.html('$' + total)
        },
        error: function (response) {
            if (response.status === 400) {
                console.log('sale mal')
            }
        }
    });

    function cartItemGenerator(id, carrito, nombre, imagen, precio, cantidad) {
        let img = document.createElement("img");
        img.setAttribute('src', imagen + '-/preview/150x150/-/stretch/fill/-/resize/150x/' +
            '-/scale_crop/150x150/center/-/sharp/-/format/webp/');
        img.setAttribute('alt', nombre);
        img.className = 'card-img-top img-fluid';

        let col1 = document.createElement("div");
        col1.className = 'col-auto flex-shrink-1 align-self-center';
        col1.appendChild(img);

        let productId = document.createElement("p");
        productId.className = 'item-subtitle'
        productId.setAttribute('name', 'cartProductId');
        productId.innerHTML = 'SKU: ' + id;

        let title = document.createElement("p");
        title.innerHTML = nombre;

        let price = document.createElement("h5");
        price.setAttribute('name', 'cartProductTotal');
        price.className = 'fw-bold';
        price.innerHTML = '$' + precio + ' c/u';

        let qty = document.createElement("p");
        qty.className = 'item-subtitle'
        qty.setAttribute('name', 'cartProductQty');
        qty.innerHTML = 'Cantidad: ' + cantidad;

        let col2 = document.createElement("div");
        col2.className = "col card-body";
        col2.appendChild(productId);
        col2.appendChild(title);
        col2.appendChild(qty);
        col2.appendChild(price);

        let row = document.createElement("div");
        row.className = "row flex-nowrap gx-0";
        row.appendChild(col1);
        row.appendChild(col2);

        let card = document.createElement("div");
        card.className = "card cart-item p-3";
        card.appendChild(row);

        return card;
    }
}

function checkoutPaymentFunctions() {
    const csrftoken = getCookie('csrftoken');
    const $cartProductCount = $('#cart-product-count');
    const $cartSubtotal = $('#cart-subtotal');
    const $cartTotal = $('#cart-total');
    const $continueBtn = $('#continueBtn')

    $.ajax({
        url: '/api/cart',
        type: 'GET',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        success: function (response) {
            let idCarrito = JSON.parse(response['id'])
            let subtotal = JSON.parse(response['subtotal'])
            let total = JSON.parse(response['total'])

            let productCount = response['productos'].length;
            let unitCount = 0;

            if (productCount === 0) {
                $continueBtn.addClass('disabled');
            } else {
                $(response['productos']).each(function () {
                    let cantidad = JSON.parse(this['cantidad'])

                    unitCount += cantidad;
                });
            }

            $cartProductCount.html('Productos (' + unitCount + ')');
            $cartSubtotal.html('$' + subtotal)
            $cartTotal.html('$' + total)
        },
        error: function (response) {
            if (response.status === 400) {
                console.log('sale mal')
            }
        }
    });

    $continueBtn.on('click', function () {
        let proveedor = $('input[name="providerRadio"]:checked').val();
        if (proveedor !== undefined) {
            $.ajax({
                url: '',
                type: 'POST',
                headers: {'X-CSRFToken': csrftoken},
                data: {'proveedor': proveedor},
                mode: 'same-origin',
                success: function (response) {
                    let url = JSON.parse(JSON.stringify(response['url']))
                    window.location = url;
                }
            });
        }
    });
}

//Funciones de videos
function videoPlay($wrapper) {
    let $iframe = $wrapper.find(".video-player");
    let src = $iframe.data("src");
    // hide poster
    $wrapper.addClass("main-videos-active");
    // add iframe src in, starting the video
    $iframe.attr("src", src);
}

function videoStop($wrapper) {
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

//Funciones de APIs

function getProductSpecs() {
    const gameName = document.getElementById('product-title').innerText;
    let gameAgeRating = 'Sin clasificación';
    let gameMetascore = 'Pendiente';
    let gameReleased = 'Sin determinar';

    $.get(
        "https://api.rawg.io/api/games?key=b4337f817a6140928baa06eddfaa532f&platforms=186,187,7&search_exact=true&search=" +
        gameName,
        function (data) {
            if ($(data.results).get(0).esrb_rating != null) {
                gameAgeRating = $(data.results).get(0).esrb_rating.name;
            }
            if ($(data.results).get(0).metacritic != null) {
                gameMetascore = $(data.results).get(0).metacritic;
            }
            if ($(data.results).get(0).released != null) {
                gameReleased = $(data.results).get(0).released;
            }

            let $metascore = $('#metascore');

            $('#esrb-rating').html(gameAgeRating);
            $($metascore).html(gameMetascore);
            $('#release-date').html(gameReleased);

            if (gameMetascore < 40) {
                $($metascore).parent().addClass('bad');
            } else if (gameMetascore >= 40 && gameMetascore < 70) {
                $($metascore).parent().addClass('normal');
            } else if (gameMetascore >= 70) {
                $($metascore).parent().addClass('good');
            } else {
                $($metascore).parent().addClass('pending');
            }
        }
    );
}

//Ir arriba
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function productChangesBeenMade(product, productName, productImg, productDate, productPrice, productBrand) {
    if (productName.trim() !== product.nombre || productImg !== '' ||
        productDate !== product.fechaLan || productPrice !== product.precio.toString() ||
        productBrand !== product.marca.toString()) {
        return true;
    }
    return false;
}

function productExists(productName, productPlatform) {
    const csrftoken = getCookie('csrftoken');
    let exists = false;
    $.ajax({
        url: '',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        data: {
            'action': 'productExists',
            'name': productName.trim(),
            'platform': productPlatform.trim(),
        },
        async: false,
        success: function (response) {
            if (JSON.parse(response['exists'])) {
                exists = true;
            }
        },
    });
    return exists;
}


function editProductExists(productId, productName, productPlatform) {
    const csrftoken = getCookie('csrftoken');
    let exists = false;
    $.ajax({
        url: '',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        data: {
            'action': 'editProductExists',
            'id': productId.trim(),
            'name': productName.trim(),
            'platform': productPlatform.trim(),
        },
        async: false,
        success: function (response) {
            if (JSON.parse(response['exists'])) {
                exists = true;
            }
        },
    });
    return exists;
}


function brandExists(brandName) {
    const csrftoken = getCookie('csrftoken');
    let exists = false;
    $.ajax({
        url: '',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        data: {
            'action': 'brandExists',
            'name': brandName.trim(),
        },
        async: false,
        success: function (response) {
            if (JSON.parse(response['exists'])) {
                exists = true;
            }
        },
    });
    return exists;
}

function subcategoryExists(subcategoryId, subcategoryName, subcategoryCategory) {
    const csrftoken = getCookie('csrftoken');
    let exists = false;
    $.ajax({
        url: '',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        data: {
            'action': 'subcategoryExists',
            'id': subcategoryId.trim(),
            'name': subcategoryName.trim(),
            'category': subcategoryCategory.trim()
        },
        async: false,
        success: function (response) {
            if (JSON.parse(response['exists'])) {
                exists = true;
            }
        },
    });
    return exists;
}

function platformExists(platformId) {
    const csrftoken = getCookie('csrftoken');
    let exists = false;
    $.ajax({
        url: '',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        data: {
            'action': 'platformExists',
            'id': platformId.trim(),
        },
        async: false,
        success: function (response) {
            if (JSON.parse(response['exists'])) {
                exists = true;
            }
        },
    });
    return exists;
}

function videoExistsInTable(id, tableBody) {
    let rowLength = tableBody.rows.length;
    for (let i = 0; i < rowLength; i += 1) {
        let row = tableBody.rows[i];
        if (row.cells[1].firstElementChild.value === id) {
            return true;
        }
    }
    return false;
}

function fillVideosTable($tableBody, productId, $saveChangesBtn, $deleteBtn, $deleteVideoId, $deleteVideoPreview) {
    $tableBody.empty();
    $deleteBtn.attr('disabled', true);
    $saveChangesBtn.attr('disabled', true);
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/api/videos',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {
            'id': productId,
        },
        mode: 'same-origin',
        success: function (response) {
            let count = 0;
            $.each(response, function () {
                let id = JSON.parse(this['id']);
                let url = JSON.parse(JSON.stringify(this['url']));
                let row = '<tr><th scope="row"><div class="form-check"><input class="form-check-input" ' +
                    'type="radio" name="videosRadioBtn" value="' + count + '"/></div></th>' +
                    '<td><input type="text" class="form-control form-control-lg custom-input" ' +
                    'value="' + url + '"><div class="invalid-feedback">Error</div></td><td>' +
                    '<iframe width="200" height="113" src="' + url + '" frameborder="0"' +
                    ' allow="autoplay; encrypted-media;" allowfullscreen></iframe></td>' +
                    '<td></td><td style="display: none">' + url + '</td>' +
                    '<td style="display: none">' + id + '</td></tr>';
                $tableBody.append(row);
                count += 1;
            });
            if (count > 0) {
                $saveChangesBtn.removeAttr('disabled');
                $('input[name="videosRadioBtn"]').on('change', function () {
                    let rowNumber = $(this).val();
                    if (rowNumber !== '') {
                        let row = $tableBody.get(0).rows[rowNumber];
                        $deleteBtn.removeAttr('disabled');
                        $deleteVideoId.val(row.cells[5].innerHTML);
                        $deleteVideoPreview.attr('src', row.cells[4].innerHTML)
                    } else {
                        $deleteBtn.attr('disabled', true);
                    }
                });
            }
        },
    });
}

function unitExists(unitId) {
    const csrftoken = getCookie('csrftoken');
    let exists = false;
    $.ajax({
        url: '',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        data: {
            'action': 'unitExists',
            'id': unitId,
        },
        async: false,
        success: function (response) {
            if (JSON.parse(response['exists'])) {
                exists = true;
            }
        },
    });
    return exists;
}

function unitExistsInTable(id, tableBody) {
    let rowLength = tableBody.rows.length;
    for (let i = 0; i < rowLength; i += 1) {
        let row = tableBody.rows[i];
        if (row.cells[1].innerHTML === id) {
            return true;
        }
    }
    return false;
}

function checkOrUncheckAllUnitsInTable(tableBody, headerCbx) {
    let rowLength = tableBody.rows.length;
    for (let i = 0; i < rowLength; i += 1) {
        let row = tableBody.rows[i];
        let cellLength = row.cells.length;
        for (let y = 0; y < cellLength; y += 1) {
            if (y === 0) {
                let cell = row.cells[y];
                let cbx = cell.firstElementChild.firstElementChild;
                cbx.checked = headerCbx.checked;
            }
        }
    }
}

function fillEditUnitsTable($tableBody, productId, $saveEditedUnitsBtn, $editUnitBtn, $unitIdInput) {
    $tableBody.empty();
    $saveEditedUnitsBtn.attr('disabled', true);
    resetAndDisableInput($unitIdInput);
    $editUnitBtn.attr('disabled', true);
    const csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        data: {
            'action': 'getUnits',
            'product': productId,
        },
        success: function (response) {
            let count = 0;
            $.each(response, function () {
                let id = JSON.parse(this['id']);
                let fechaIng = JSON.parse(JSON.stringify(this['fechaIng']));
                let row = '<tr><th scope="row"><div class="form-check"><input class="form-check-input" type="radio"' +
                    'name="editUnitRadioBtn" id="edit-unit-thead-check" value="' + count + '"/></div></th>' +
                    '<td>' + id + '</td><td>' + fechaIng + '</td><td></td><td style="display: none">' + id + '</td></tr>';
                $tableBody.append(row);
                count += 1;
            });
            if (count > 0) {
                $saveEditedUnitsBtn.removeAttr('disabled');
                $('input[name="editUnitRadioBtn"]').on('change', function () {
                    let rowNumber = $(this).val();
                    if (rowNumber !== '') {
                        let row = $tableBody.get(0).rows[rowNumber];
                        fillAndEnableInput($unitIdInput, row.cells[1].innerText);
                        $editUnitBtn.removeAttr('disabled');
                    } else {
                        resetAndDisableInput($unitIdInput);
                        $editUnitBtn.attr('disabled', true);
                    }
                });
            }
        },
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}