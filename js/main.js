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
        const nombreLimpio = nombre.value.trim();

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





        if (esValido) { //solo lo activamos cuando todas las validaciones sean correctas
            console.log('Formulario válido, listo para enviar a la base de datos')
            //form.submit();   //se activara cuando conectemos a fs
        }
    });
});