//Validacion

const loginForm = document.getElementById('login-form')
const loginEmail = document.getElementById('login-email')
const loginPassword = document.getElementById('login-pw')
const registerPassword = document.getElementById('register-pw')

loginForm.addEventListener('submit', (e) => {
    if(!checkLoginInputsOnSubmit()){
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

function checkLoginInputsOnSubmit() {
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

function checkEmailOnFocusOut(email) {
    const emailValue = email.value.trim();

    if(!isEmail(emailValue) && emailValue!=='') {
        setErrorFor(email, 'Por favor ingrese un email válido');
    } else {
        resetInput(email);
    }
}

function setErrorFor(input, message) {
    const formOutline = input.parentElement;
    const errorMessage = formOutline.querySelector('div.invalid-feedback')

    //add error message inside container
    errorMessage.innerText = message;

    //add error class
    formOutline.className = 'form-outline error';

    if (input.classList.contains('active')){
        input.className = 'form-control form-control-lg custom-input is-invalid active';
    } else {
        input.className = 'form-control form-control-lg custom-input is-invalid';
    }
}

function setSuccessFor(input) {
    const formOutline = input.parentElement;
    formOutline.className = 'form-outline success';

    if (input.classList.contains('active')){
        input.className = 'form-control form-control-lg custom-input active';
    } else {
        input.className = 'form-control form-control-lg custom-input';
    }
}

function resetInput(input) {
    const formOutline = input.parentElement;
    formOutline.className = 'form-outline';

    if (input.classList.contains('active')){
        input.className = 'form-control form-control-lg custom-input active';
    } else {
        input.className = 'form-control form-control-lg custom-input';
    }
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function checkSuccess(input){
    const formOutline = input.parentElement;
    return formOutline.classList.contains('success');
}

//Ver contrasena/ocultar

const loginPasswordToggleBtn = document.getElementById('login-sh-btn')
const registerPasswordToggleBtn = document.getElementById('register-sh-btn')

loginPasswordToggleBtn.addEventListener('click', () => {
    togglePasswordView(loginPassword, loginPasswordToggleBtn);
});

registerPasswordToggleBtn.addEventListener('click', () => {
    togglePasswordView(registerPassword, registerPasswordToggleBtn);
});

function togglePasswordView(password, button){
    if (password.type === 'password'){
        password.type = 'text';
        button.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    } else {
        password.type = 'password';
        button.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }
}