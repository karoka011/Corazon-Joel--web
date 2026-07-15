//Crag un archivo HTML externo y lo inserta en un elemento de la pagina

//esto se hace para agarrar el header y fooer y solamente incorporarlo en cada página evitando duplicar código

async function cargarComponente(nombreArchivo, idDestino) {
    //fetch pide al archivo header.html y cuando llega lo mete dentro de un div que sirve como placeholder "marcador de posicion"

    const respuesta = await fetch(`partials/${nombreArchivo}`);
    const html = await respuesta.text();
    document.getElementById(idDestino).innerHTML = html;
}

cargarComponente('header.html', 'header-placeholder');
cargarComponente('footer.html', 'footer-placeholder');