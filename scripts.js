document.addEventListener('DOMContentLoaded', () => {
    const passwordOutput = document.getElementById('passwordOutput');
    const copyButton = document.getElementById('copyButton');
    const generateButton = document.getElementById('generateButton');
    const passwordLength = document.getElementById('passwordLength');
    const passwordLengthValue = document.getElementById('passwordLengthValue');
    const errorMessage = document.createElement('p'); // Mensaje de error

    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');

    const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
    const NUMBER_CHARS = '0123456789';
    const SYMBOL_CHARS = '!@#$%^&*()_+[]{}<>?,./';

    // Mensaje de error personalizado
    errorMessage.textContent = 'Por favor, selecciona al menos una opción para generar la contraseña.';
    errorMessage.style.color = 'red';
    errorMessage.style.display = 'none'; // Oculto por defecto
    generateButton.parentElement.appendChild(errorMessage); // Añadir el mensaje debajo del botón

    function generatePassword() {
        let chars = '';
        if (includeUppercase.checked) chars += UPPERCASE_CHARS;
        if (includeLowercase.checked) chars += LOWERCASE_CHARS;
        if (includeNumbers.checked) chars += NUMBER_CHARS;
        if (includeSymbols.checked) chars += SYMBOL_CHARS;

        if (!chars) { // Si no hay ninguna opción marcada
            errorMessage.style.display = 'block'; // Mostrar el mensaje de error
            passwordOutput.value = ''; // Limpiar el campo de contraseña
            return;
        }

        errorMessage.style.display = 'none'; // Ocultar el mensaje de error si todo está bien

        const length = parseInt(passwordLength.value);
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        passwordOutput.value = password;
    }

    // Actualiza la longitud visualmente
    passwordLength.addEventListener('input', () => {
        passwordLengthValue.textContent = passwordLength.value;
    });

    // Generar contraseña al hacer clic en el botón
    generateButton.addEventListener('click', generatePassword);

    // Copiar contraseña al portapapeles
    copyButton.addEventListener('click', () => {
        if (passwordOutput.value) {
            passwordOutput.select();
            document.execCommand('copy');
            alert('Contraseña copiada al portapapeles!');
        } else {
            alert('No hay contraseña para copiar.');
        }
    });

    // Generar una contraseña inicial al cargar la página
    generatePassword();
});
