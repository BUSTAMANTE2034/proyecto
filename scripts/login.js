// login.js

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const correo = document.getElementById('email').value;
    const contrasena = document.getElementById('password').value;

    // Enviar solicitud POST al endpoint /login
    fetch('https://socialitec2034.pythonanywhere.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo, contrasena })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        const tipoUsuario = data.tipo_usuario;
        let redirectUrl = '';
        let userIdParam = '';

        if (tipoUsuario === 1) { // Administrador
          const idAdministrador = getUserIdFromResponse(data, 'Administrador');
          redirectUrl = `../structures/layout.html?id_administrador=${idAdministrador}`;
        } else if (tipoUsuario === 2) { // Encargado
          const idEncargado = getUserIdFromResponse(data, 'Encargado');
          redirectUrl = `../structures/service_manager/index.html?id_encargado=${idEncargado}`;
        } else if (tipoUsuario === 3) { // Estudiante
          const idEstudiante = getUserIdFromResponse(data, 'Estudiante');
          redirectUrl = `../structures/student/index.html?id_estudiante=${idEstudiante}`;
        } else {
          errorMessage.textContent = 'Tipo de usuario desconocido.';
          return;
        }

        // Redirigir al usuario
        window.location.href = redirectUrl;
      } else {
        // Mostrar mensaje de error
        errorMessage.textContent = data.message || 'Error al iniciar sesión.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      errorMessage.textContent = 'Error al conectar con el servidor.';
    });
  });

  /**
   * Función para obtener el ID del usuario basado en el tipo de usuario.
   * @param {Object} data - La respuesta del backend.
   * @param {String} userType - El tipo de usuario ('Administrador', 'Encargado', 'Estudiante').
   * @returns {Number|null} - El ID del usuario o null si no se encuentra.
   */
  function getUserIdFromResponse(data, userType) {
    // Supongamos que el backend incluye el ID en la respuesta
    // Puedes ajustar esta función según cómo el backend devuelve el ID
    if (userType === 'Administrador' && data.id_administrador) {
      return data.id_administrador;
    } else if (userType === 'Encargado' && data.id_encargado) {
      return data.id_encargado;
    } else if (userType === 'Estudiante' && data.id_estudiante) {
      return data.id_estudiante;
    }
    return null;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  const forgotPasswordModal = document.getElementById('forgot-password-modal');
  const closeModalButton = document.getElementById('close-modal');
  const forgotPasswordForm = document.getElementById('forgot-password-form');
  const successMessage = document.getElementById('success-message');

  // Abrir el modal
  forgotPasswordLink.addEventListener('click', function (e) {
    e.preventDefault();
    forgotPasswordModal.style.display = 'flex';
  });

  // Cerrar el modal
  closeModalButton.addEventListener('click', function () {
    forgotPasswordModal.style.display = 'none';
  });

  // Manejar el envío del formulario
  forgotPasswordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;

    // Mostrar el mensaje de éxito
    successMessage.style.display = 'block';

    // Después de 3 segundos, cerrar el modal
    setTimeout(function () {
      forgotPasswordModal.style.display = 'none'; // Cierra el modal
      successMessage.style.display = 'none'; // Oculta el mensaje de éxito
    }, 3000); // 3 segundos
  });
});

