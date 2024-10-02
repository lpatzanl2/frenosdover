/*=============== SHOW HIDDEN - PASSWORD ===============*/
const showHiddenPass = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass),
          iconEye = document.getElementById(loginEye);

    iconEye.addEventListener('click', () => {
        // Cambia de password a texto
        if (input.type === 'password') {
            input.type = 'text';
            iconEye.classList.add('ri-eye-line');
            iconEye.classList.remove('ri-eye-off-line');
        } else {
            // Cambia de texto a password
            input.type = 'password';
            iconEye.classList.remove('ri-eye-line');
            iconEye.classList.add('ri-eye-off-line');
        }
    });
}

// Llamada a la función para mostrar/ocultar contraseña
showHiddenPass('login-password', 'login-eye');

/*=============== FORM SUBMIT - LOGIN ===============*/
document.querySelector('.login__form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir recarga de la página

    // Obtener valores de usuario y contraseña
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Crear objeto con los datos del usuario
    const data = { username, password };

    try {
        // Hacer la petición POST al servidor
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        // Verificar el resultado de la autenticación
        if (result.message === 'Usuario registrado') {
            window.location.href = '/success'; // Redirigir a la página de éxito
        } else {
            alert('El usuario no existe'); // Mostrar mensaje de error
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

/*=============== success.html ===============*/
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})