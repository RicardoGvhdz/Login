// Captcha generation
const captchaText = document.getElementById('captchaText');
const message = document.getElementById('message');
let generatedCaptcha = '';

// Elementos de los campos
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const captchaInput = document.getElementById('captcha');

// Generación de Captcha
function generateCaptcha() {
    generatedCaptcha = Math.random().toString(36).substring(2, 8);
    captchaText.innerText = generatedCaptcha;
}

generateCaptcha();

// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function () {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    this.innerText = type === 'password' ? 'Mostrar' : 'Ocultar';
});

// Validación de usuario
usernameInput.addEventListener('input', function () {
    if (usernameInput.value.length < 5) {
        message.innerText = 'El usuario debe tener al menos 5 caracteres.';
    } else {
        message.innerText = '';
    }
});

// Validación de contraseña
passwordInput.addEventListener('input', function () {
    if (passwordInput.value.length < 8 || !/[A-Z]/.test(passwordInput.value) || !/[0-9]/.test(passwordInput.value)) {
        message.innerText = 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula y un número.';
    } else {
        message.innerText = '';
    }
});

// Confirmación de contraseña
confirmPasswordInput.addEventListener('input', function () {
    if (confirmPasswordInput.value !== passwordInput.value) {
        message.innerText = 'Las contraseñas no coinciden.';
    } else {
        message.innerText = '';
    }
});

// Validación final y envío del formulario
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const captcha = captchaInput.value.trim();

    // Validaciones de campo vacío
    if (username === '' || password === '' || confirmPassword === '' || captcha === '') {
        message.innerText = 'Por favor, completa todos los campos.';
        return;
    }

    // Validación de usuario
    if (username.length < 5) {
        message.innerText = 'El usuario debe tener al menos 5 caracteres.';
        return;
    }

    // Validación de contraseña
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        message.innerText = 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula y un número.';
        return;
    }

    // Confirmación de contraseñas
    if (password !== confirmPassword) {
        message.innerText = 'Las contraseñas no coinciden.';
        return;
    }

    // Validación de captcha
    if (captcha !== generatedCaptcha) {
        message.innerText = 'El captcha es incorrecto.';
        generateCaptcha();
        return;
    }

    // Mensaje de éxito
    message.style.color = 'green';
    message.innerText = 'Inicio de sesión exitoso.';
});
