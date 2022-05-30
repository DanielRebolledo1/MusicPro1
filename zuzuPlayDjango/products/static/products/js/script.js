const body = document.body;

if (body.classList.contains('home')) {
    console.log('home')

    $(document).ready(function () {
        const $subsEmail = $('#subs-email');

        $('#subs-form').on('submit', function (e) {
            if (checkSubsInputsOnSubmit($subsEmail.get(0))) {
                $.post('', $(this).serialize(), function (response) {
                    if (JSON.parse(response['success'])) {
                        setPostSuccessFor($subsEmail.get(0), 'Te has suscrito con éxito.');
                    } else {
                        setErrorFor($subsEmail.get(0), 'Algo salió mal!');
                    }
                });
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
        const $loginEmail = $('#login-email');
        const $loginPassword = $('#login-pw');
        const $forgotPasswordEmail = $('#forgot-pw-email');
        const $registerName = $('#register-name');
        const $registerLastName = $('#register-lastname');
        const $registerEmail = $('#register-email');
        const $registerPassword = $('#register-pw');
        const passwordStrengthIndicator = document.getElementById('pw-strength');

        $('#login-form').on('submit', function (e) {
            if (!checkLoginInputsOnSubmit($loginEmail.get(0), $loginPassword.get(0))) {
                e.preventDefault();
            }
        });

        $($loginEmail).on({
            focusout: function () {
                checkEmailOnFocusOut($loginEmail.get(0));
            },
            input: function () {
                resetInput($loginEmail.get(0));
            }
        });

        $($loginPassword).on('input', function () {
            resetInput($loginPassword.get(0));
        });

        $('#forgot-pw-form').on('submit', function (e) {
            if (!checkForgotPasswordInputsOnSubmit($forgotPasswordEmail.get(0))) {
                e.preventDefault();
            }
        });

        $($forgotPasswordEmail).on({
            focusout: function () {
                checkEmailOnFocusOut($forgotPasswordEmail.get(0));
            },
            input: function () {
                resetInput($forgotPasswordEmail.get(0));
            }
        });

        $('#register-form').on('submit', function (e) {
            if (!checkRegisterInputsOnSubmit($registerEmail.get(0), $registerPassword.get(0),
                passwordStrengthIndicator, $registerName.get(0), $registerLastName.get(0))) {
                e.preventDefault();
            }
        });

        $($registerName).on('input', function () {
            resetInput($registerName.get(0));
        });

        $($registerLastName).on('input', function () {
            resetInput($registerLastName.get(0));
        });

        $($registerEmail).on({
            focusout: function () {
                checkEmailOnFocusOut($registerEmail.get(0));
            },
            input: function () {
                resetInput($registerEmail.get(0));
            }
        });

        $($registerPassword).on('input', function () {
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

        $(".video-cover").on("click", function () {
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

if (body.classList.contains('catalog')) {
    console.log('catalog')

    $(document).ready(function (node, child) {
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

        // Pagination
        const productList = Array.from(document.querySelectorAll('#cat-products>a'));
        const pageButtons = document.getElementsByClassName('page-btn');
        $firstBtn = $('#first-page');
        $lastBtn = $('#last-page');
        let pageCount = pageButtons.length;
        let productCount = productList.length;
        let limitPerPage = 10;
        let pageTotal = Math.ceil(productCount / limitPerPage);
        let currentPage = parseInt(document.getElementsByClassName('page-item active')[0].innerText);

        checkPage(currentPage);

        while (pageCount !== pageTotal) {
            let pageNumber = pageCount + 1;
            let buttonFormat = '<li class="page-item">' +
                '<button class="page-link page-btn">' + pageNumber +
                '</button></li>'
            $(buttonFormat).insertBefore($($lastBtn).parent(), child);

            pageCount += 1;
        }

        function checkPage(currentPage) {
            hideProducts();

            $($firstBtn).parent().toggleClass("disabled", currentPage === 1);
            $($lastBtn).parent().toggleClass("disabled", currentPage === pageTotal);

            for (let i = 0; i < productList.length; i += limitPerPage) {
                const pageProducts = productList.slice(i, i + limitPerPage);
                if (i === (currentPage - 1) * limitPerPage) {
                    pageProducts.forEach(showProducts);
                }
            }
        }

        function showProducts(item) {
            for (let i = 0; i < productList.length; i += 1) {
                if (item === productList[i]) {
                    $(productList[i]).show('fade', 200);
                }
            }
        }

        function hideProducts() {
            for (let i = 0; i < productList.length; i += 1) {
                $(productList[i]).removeAttr('style');
            }
        }

        for (let i = 0; i < pageButtons.length; i += 1) {
            pageButtons[i].addEventListener("click", function () {
                let previousPage = currentPage;

                document.getElementsByClassName('page-item active')[0].classList.remove('active');
                pageButtons[i].parentElement.classList.add('active');

                currentPage = parseInt(document.getElementsByClassName('page-item active')[0].innerText);

                if (currentPage !== previousPage) {
                    checkPage(currentPage);
                }

                scrollToTop();
            });
        }

        $($firstBtn).on("click", function () {
            currentPage = 1;
            checkPage(currentPage);
            document.getElementsByClassName('page-item active')[0].classList.remove('active');
            pageButtons[0].parentElement.classList.add('active');
        });

        $($lastBtn).on("click", function () {
            currentPage = pageTotal;
            checkPage(currentPage);
            document.getElementsByClassName('page-item active')[0].classList.remove('active');
            pageButtons[currentPage - 1].parentElement.classList.add('active');
        });
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

if (body.classList.contains('admin')) {
    console.log('admin')

    $(document).ready(function () {
        let $newProductForm = $('#new-product-form');
        let $newProductResponse = $('#new-product-response');
        let $newProductSearch = $('#new-product-search');
        let $newProductName = $('#new-product-name');
        let $newProductImg = $('#new-product-img');
        let $newProductDate = $('#new-product-date');
        let $newProductPrice = $('#new-product-price');
        let $newProductBrand = $('#new-product-brand');
        let $newProductSubcategory = $('#new-product-subcategory');
        let $newProductPlatform = $('#new-product-platform');

        let $editProductForm = $('#edit-product-form');
        let $editProductResponse = $('#edit-product-response');
        let $editProductSearch = $('#edit-product-search');
        let $editProductCurrentImg = $('#edit-product-current-img');
        let $editProductId = $('#edit-product-id');
        let $editProductName = $('#edit-product-name');
        let $editProductImg = $('#edit-product-img');
        let $editProductDate = $('#edit-product-date');
        let $editProductPrice = $('#edit-product-price');
        let $editProductBrand = $('#edit-product-brand');
        let $editProductSubcategory = $('#edit-product-subcategory');
        let $editProductPlatform = $('#edit-product-platform');
        let $editVisibleProductSubcategory = $('#edit-product-subcategory-visible');
        let $editVisibleProductPlatform = $('#edit-product-platform-visible');

        let $editProductBtn = $('#edit-product-btn');
        let $deleteProductBtn = $('#delete-product-btn');

        let product = '';
        let formData = '';

        let csrfToken = $("input[name=csrfmiddlewaretoken]").val();

        $newProductForm.on('submit', function (e) {
            if (checkNewProductInputsOnSubmit($newProductName.get(0), $newProductImg.get(0), $newProductDate.get(0),
                $newProductPrice.get(0), $newProductBrand.get(0), $newProductSubcategory.get(0),
                $newProductPlatform.get(0))) {
                if (!productExists($newProductName.val(), $newProductPlatform.val())) {
                    formData = new FormData($newProductForm.get(0));
                    formData.append('action', 'newProduct');
                    formData.append('csrfmiddlewaretoken', csrfToken);
                    $.ajax({
                        url: '',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            if (JSON.parse(response['success'])) {
                                $newProductImg.val('').removeClass('active');
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
            e.preventDefault();
        });

        $newProductForm.on('reset', function () {
            $newProductSearch.val('');
            $newProductResponse.html('');
            resetInput($newProductName.get(0));
            resetInput($newProductImg.get(0));
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

        $editProductForm.on('submit', function (e) {
            if (checkEditProductInputsOnSubmit($editProductName.get(0), $editProductDate.get(0),
                $editProductPrice.get(0), $editProductBrand.get(0))) {
                if (productChangesBeenMade(product, $editProductName.val(), $editProductImg.get(0), $editProductDate.val(),
                    $editProductPrice.val(), $editProductBrand.val())) {
                    if (!productExists($editProductName.val(), $editProductPlatform.val())) {
                        formData = new FormData($editProductForm.get(0));
                        formData.append('action', 'editProduct')
                        formData.append('csrfmiddlewaretoken', csrfToken)
                        $.ajax({
                            url: '',
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (response) {
                                if (JSON.parse(response['success'])) {
                                    product = {
                                        'value': $editProductName.val() + ' ' + $editProductPlatform.val(),
                                        'nombre': $editProductName.val(),
                                        'imagen': response['imagen'],
                                        'fechaLan': $editProductDate.val(),
                                        'precio': $editProductPrice.val(),
                                        'marca': $editProductBrand.val(),
                                    }
                                    $editProductImg.val('').removeClass('active');
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
            e.preventDefault();
        });

        $deleteProductBtn.on('click', function () {
            $('#delete-product-id').html(product.id);
            $('#delete-product-name').html(product.value);
        });

        $('#delete-product-confirm-btn').on('click', function () {
            $.ajax({
                url: '',
                type: 'POST',
                data: {
                    'action': 'deleteProduct',
                    'id': product.id,
                    'csrfmiddlewaretoken': csrfToken,
                },
                success: function (response) {
                    if (JSON.parse(response['success'])) {
                        $('#delete-product-cancel-btn').click();
                        $editProductSearch.val('');
                        $editProductForm.get(0).reset();
                        $editProductCurrentImg.attr('src', '').removeClass('visible');
                        resetInput($editProductId.get(0));
                        resetInput($editProductName.get(0));
                        resetInput($editProductImg.get(0));
                        resetInput($editProductDate.get(0));
                        $editProductDate.css('opacity', 0);
                        resetInput($editProductPrice.get(0));
                        resetInput($editProductBrand.get(0));
                        resetInput($editVisibleProductSubcategory.get(0));
                        resetInput($editVisibleProductPlatform.get(0));
                        $editProductName.attr('disabled', '');
                        $editProductImg.attr('disabled', '');
                        $editProductDate.attr('disabled', '');
                        $editProductPrice.attr('disabled', '');
                        $editProductBrand.attr('disabled', '');
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

        $newProductSearch.autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: '?search=' + request.term,
                    type: 'POST',
                    data: {
                        'action': 'autocomplete',
                        'term': request.term,
                        'csrfmiddlewaretoken': csrfToken,
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

        $editProductSearch.autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: '?search=' + request.term,
                    type: 'POST',
                    data: {
                        'action': 'autocomplete',
                        'term': request.term,
                        'csrfmiddlewaretoken': csrfToken,
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
                $deleteProductBtn.removeAttr("disabled");
                $editProductBtn.removeAttr("disabled");
                $editProductResponse.html('');
                return false;
            }
        });
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

    if (nameValue === '') {
        setErrorFor(newName, 'Por favor ingrese un nombre');
    } else {
        setSuccessFor(newName);
    }

    if (imgValue === '') {
        setErrorFor(newImg, 'Por favor seleccione una imagen');
    } else {
        setSuccessFor(newImg);
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

    return checkSuccess(newName) && checkSuccess(newImg) && checkSuccess(newDate) && checkSuccess(newPrice) &&
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
        $sidebar.show("slide", 300);
        $sidebar.css('overflow', 'auto');
        $('body').css('overflow', 'hidden');
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
    /*document.getElementById('product-title').innerText*/
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

function fillInput($input, value) {
    $input.val(value);
    $input.addClass('active');
}

function fillAndEnableInput($input, value) {
    $input.val(value);
    $input.addClass('active');
    $input.removeAttr('disabled');
}

function productChangesBeenMade(product, productName, productImg, productDate, productPrice, productBrand) {
    if (productName.trim() !== product.nombre || productImg.classList.contains('active') ||
        productDate !== product.fechaLan || productPrice !== product.precio.toString() ||
        productBrand !== product.marca.toString()) {
        return true;
    }
    return false;
}

function productExists(productName, productPlatform) {
    const csrfToken = $("input[name=csrfmiddlewaretoken]").val();
    let exists = false;
    $.ajax({
        url: '',
        type: 'POST',
        data: {
            'action': 'productExists',
            'csrfmiddlewaretoken': csrfToken,
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