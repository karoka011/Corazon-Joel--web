document.addEventListener('DOMContentLoaded', () => {
    //DOMContentLoaded asegura que el js corracuando el HTML ya cargo

    const form = document.getElementById('form-registro');
    form.addEventListener('submit', (e) => {

        e.preventDefault(); //Evita que se envie mientras se prueban las validaciones

        let esValido = true; //cuando algo falle cambia  false



        //VALIDACION DEL NOMBRE
        //validar que no este vacio el campo y que al menos tenga nombre y apellido
        const nombre = document.getElementById('nombre');
        const errorNombre = document.getElementById('error-nombre');
        const nombreLimpio = nombre.value.trim(); //trm quita espacios al inicio o al final

        if (nombreLimpio === '') {
            errorNombre.textContent = 'Por favor ingresa tu nombre completo';
            esValido = false;

        } else if (nombreLimpio.split(' ').filter(p => p.length > 0).length < 2) {
            errorNombre.textContent = 'Ingresa nombre completo y apellidos';
            esValido = false;

        } else {
            errorNombre.textContent = '';
        }




        //VALIDACION DE LA EDAD
        const edad = document.getElementById('edad');
        const errorEdad = document.getElementById('error-edad');
        const edadValor = edad.value.trim();
        const edadNumero = Number(edadValor);

        if (edadValor === '') {
            errorEdad.textContent = 'Por favor ingresa tu edad';
            esValido = false;

        } else if (!Number.isInteger(edadNumero)) {
            errorEdad.textContent = 'Ingresa un número de edad válido (sin letras ni decimales)';
            esValido = false;

        } else if (edadNumero < 18) {
            errorEdad.textContent = 'Debes ser mayor de 18 años para participar como voluntari@';
            esValido = false;

        } else if (edadNumero > 70) {
            errorEdad.textContent = 'Por favor contacta directamente a la organizacion';
            esValido = false;

        } else {
            errorEdad.textContent = '';
        }




        //VALIDACION DE LA OCUPACION
        const ocupacion = document.getElementById('ocupacion');
        const errorOcupacion = document.getElementById('error-ocupacion');
        const ocupacionLimpia = ocupacion.value.trim();

        if (ocupacionLimpia === '') {
            errorOcupacion.textContent = 'Por favor indica tu ocupación.';
            esValido = false;

        } else if (ocupacionLimpia.length < 3) {
            errorOcupacion.textContent = 'Ese dato parece incompleto, por favor detállalo un poco más.';
            esValido = false;

        } else {
            errorOcupacion.textContent = '';
        }



        //VALIDACION DE LA MOTIVACION
        const motivacion = document.getElementById('motivacion');
        const errorMotivacion = document.getElementById('error-motivacion');
        const motivacionLimpia = motivacion.value.trim();
        const MIN_CARACTERES_MOTIVACION = 30;

        if (motivacionLimpia === '') {
            errorMotivacion.textContent = 'Por favor cuéntanos por qué te gustaría participar.';
            esValido = false;

        } else if (motivacionLimpia.length < MIN_CARACTERES_MOTIVACION) {
            errorMotivacion.textContent = `Cuéntanos un poco más (mínimo ${MIN_CARACTERES_MOTIVACION} caracteres, llevas ${motivacionLimpia.length}).`;
            esValido = false;

        } else {
            errorMotivacion.textContent = '';
        }




        //VALIDACION: HOSPITAL 
        const hospital = document.getElementById('hospital');
        const errorHospital = document.getElementById('error-hospital');

        if (hospital.value === '') {
            errorHospital.textContent = ' Por favor selecciona un hopital de preferencia.';
            esValido = false;

        } else {
            errorHospital.textContent = '';
        }



        //VALIDACION: DISPONIBILIDAD
        const disponibilidad = document.getElementById('disponibilidad');
        const errorDisponibilidad = document.getElementById('error-disponibilidad');

        if (disponibilidad.value === '') {
            errorDisponibilidad.textContent = 'Por favor selecciona tu disponibilidad.';
            esValido = false;

        } else {
            errorDisponibilidad.textContent = '';
        }



        //VALIDACION: CORREO
        const correo = document.getElementById('correo');
        const errorCorreo = document.getElementById('error-correo');
        const correoLimpio = correo.value.trim();
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (correoLimpio == '') {
            errorCorreo.textContent = 'Por favor ingresa tu correo electrónico';
            esValido = false;

        } else if (!regexCorreo.test(correoLimpio)) {
            errorCorreo.textContent = 'Ingresa un correo válido (ej. nombre@correo.com)';
            esValido = false;

        } else {
            errorCorreo.textContent = '';
        }



        //VALIDACION: CELULAR
        const celular = document.getElementById('celular');
        const errorCelular = document.getElementById('error-celular');
        const celularDigitos = celular.value.replace(/[\s\-+]/g, '');
        const regexCelular = /^\d{10,13}$/;

        if (celularDigitos === '') {
            errorCelular.textContent = 'Por favor ingresa tu número de celular';
            esValido = false;

        } else if (!regexCelular.test(celularDigitos)) {
            errorCelular.textContent = 'Ingresa un número válido (10 digitos, puedes incluir +52)';
            esValido = false;
        } else {
            errorCelular.textContent = '';
        }


        if (esValido) { //solo lo activamos cuando todas las validaciones sean correctas
            console.log('Formulario válido, listo para enviar a la base de datos')
            //form.submit();   //se activara cuando conectemos a fs
        }
    });
});