document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const campos = form.elements;
  
    // Función para mostrar errores
    const mostrarError = (campo, mensaje) => {
      campo.classList.add("campo-error");
      campo.classList.remove("campo-ok");
  
      let error = campo.parentNode.querySelector(".mensaje-error");
      if (!error) {
        error = document.createElement("span");
        error.classList.add("mensaje-error");
        campo.parentNode.appendChild(error);
      }
      error.textContent = mensaje;
    };
  
    // Función para limpiar errores
    const limpiarError = (campo) => {
      campo.classList.remove("campo-error");
      campo.classList.add("campo-ok");
  
      const error = campo.parentNode.querySelector(".mensaje-error");
      if (error) {
        error.remove();
      }
    };
  
    // Validaciones individuales
    const validarNombre = () => {
      const nombre = campos["nombre"];
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{5,80}$/;
      if (!regex.test(nombre.value.trim())) {
        mostrarError(nombre, "El nombre debe tener entre 5 y 80 caracteres y solo letras.");
        return false;
      }
      limpiarError(nombre);
      return true;
    };
  
    const validarDNI = () => {
      const dni = campos["dni"];
      const regex = /^\d{7,8}$/;
      if (!regex.test(dni.value.trim())) {
        mostrarError(dni, "El DNI debe tener entre 7 y 8 dígitos.");
        return false;
      }
      limpiarError(dni);
      return true;
    };
  
    const validarEmail = () => {
      const email = campos["email"];
      const confirmEmail = campos["confirm-email"];
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!regex.test(email.value.trim())) {
        mostrarError(email, "El correo electrónico no es válido.");
        return false;
      }
      limpiarError(email);
  
      if (email.value.trim() !== confirmEmail.value.trim()) {
        mostrarError(confirmEmail, "Los correos electrónicos no coinciden.");
        return false;
      }
      limpiarError(confirmEmail);
      return true;
    };
  
    const validarTelefono = () => {
      const telefono = campos["telefono"];
      const regex = /^[\d\s\-\+]{8,}$/;
      if (!regex.test(telefono.value.trim())) {
        mostrarError(telefono, "El teléfono debe tener al menos 8 dígitos.");
        return false;
      }
      limpiarError(telefono);
      return true;
    };
  
    const validarTipoCliente = () => {
      const tipoCliente = form.querySelector('input[name="tipo-cliente"]:checked');
      if (!tipoCliente) {
        mostrarError(campos["tipo-cliente"], "Debe seleccionar un tipo de cliente.");
        return false;
      }
  
      if (tipoCliente.value === "empresa") {
        const nombreEmpresa = campos["nombre-empresa"];
        const cuit = campos["cuit"];
        const regexCUIT = /^(\d{2}-\d{8}-\d{1}|\d{11})$/;
  
        if (nombreEmpresa.value.trim() === "") {
          mostrarError(nombreEmpresa, "El nombre de la empresa no puede estar vacío.");
          return false;
        }
        limpiarError(nombreEmpresa);
  
        if (!regexCUIT.test(cuit.value.trim())) {
          mostrarError(cuit, "El CUIT debe tener el formato ##-########-# o 11 dígitos.");
          return false;
        }
        limpiarError(cuit);
      }
      return true;
    };
  
    const validarProvinciaYLocalidad = () => {
      const provincia = campos["provincia"];
      const localidad = campos["localidad"];
  
      if (provincia.value === "") {
        mostrarError(provincia, "Debe seleccionar una provincia.");
        return false;
      }
      limpiarError(provincia);
  
      if (localidad.value.trim().length < 2) {
        mostrarError(localidad, "La localidad debe tener al menos 2 caracteres.");
        return false;
      }
      limpiarError(localidad);
      return true;
    };
  
    // Validación general
    const validarFormulario = (e) => {
      e.preventDefault(); // Evitar el envío del formulario
  
      let esValido = true;
  
      // Validar cada campo
      esValido &= validarNombre();
      esValido &= validarDNI();
      esValido &= validarEmail();
      esValido &= validarTelefono();
      esValido &= validarTipoCliente();
      esValido &= validarProvinciaYLocalidad();
  
      // Si todo es válido, mostrar pantalla de confirmación
      if (esValido) {
        mostrarPantallaConfirmacion();
      } else {
        const primerError = form.querySelector(".campo-error");
        if (primerError) {
          primerError.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
  
    // Pantalla de confirmación
    const mostrarPantallaConfirmacion = () => {
      form.style.display = "none";
  
      const confirmacion = document.createElement("div");
      confirmacion.classList.add("confirmacion");
      confirmacion.innerHTML = `
        <h2>¡Ingreso registrado con éxito!</h2>
        <p>Gracias por registrar su equipo. Su número de orden es: <strong>${Math.floor(Math.random() * 100000)}</strong></p>
        <p>En hasta 48 horas hábiles recibirá un diagnóstico.</p>
        <div class="form-buttons">
          <a href="index.html" class="btn">Volver al inicio</a>
          <button onclick="location.reload()">Ingresar otro equipo</button>
        </div>
      `;
      form.parentNode.appendChild(confirmacion);
    };
  
    // Escuchar el evento submit
    form.addEventListener("submit", validarFormulario);
  });