let user
let modalNewPublicacion = document.getElementById("newPublicacion")
let modalNewP = new mdb.Modal(modalNewPublicacion)
   
document.addEventListener('DOMContentLoaded', async ()=>{
    // Tu código aquí

    document.getElementById("cerrarSesion").addEventListener("click",()=>{
        localStorage.clear()
        location.href="../login/php/logout.php"
    })
    /* SALUDA AL USUARIO */
    saludar()
    /* LISTA TODAS LAS PUBLICACIONES */
    await listarPublicaciones()
    /* GUARDAR PUBLICACION */
    document.getElementById('nuevaPublicacion').addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente
        modalNewP.hide()
        await guardarPublicacion()
        
    });




});


function saludar() {
    user=JSON.parse(localStorage.getItem("user"))
    // Display a success toast, with a title
    toastr.info("Biendenido! "+`<span style="font-weight: bold;">${user.user}</span>`)
}

async function guardarPublicacion() {
    let formData = new FormData(document.getElementById('nuevaPublicacion')); // Captura los datos del formulario  
    let response = await fetch('php/insertPublicacion.php', {
        method: 'POST',
        body: formData,
    });
    response = await response.json();
    if(response!="ok"){
        // Display an error toast, with a title
        toastr.error(response, 'Error!')
        setTimeout(() => {
            modalNewP.show()
        }, 500);
    }else{
        toastr.success("Se guardo la publicacion con exito", 'Exito!')
        document.getElementById('nuevaPublicacion').reset()
        await listarPublicaciones()

    }

}

async function listarPublicaciones() {
    let response = await fetch('php/listarPublicaciones.php');
    response = await response.json();
    dibujarPublicaciones(response)

}
function dibujarPublicaciones(publicaciones) {
    let publicacionesCard=``
    publicaciones.forEach(element => {
        console.log(obtenerExtension(element.direccion_archivo))
        publicacionesCard+=`
        <div class="col-md-4 mt-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${element.titulo}</h5>
                    <p class="card-text">${truncarTexto(element.texto,30)}</p>
                    <div class="card-footer text-muted text-center">${formatearFecha(element.fecha)}</div>
                    <div onclick="descargar('php/${element.direccion_archivo}')" data-mdb-ripple-init style="user-select: none;background: rgb(245 245 245);cursor: pointer;" class="card-footer p-2 rounded mb-2">
                        <div class="row">
                            <div class="col-3">
                                <img class="w-100" src="circulo.png">
                            </div>
                            <div class="col-9 d-flex flex-row align-items-center">
                                <span>${obtenerNombre(element.direccion_archivo)}</span>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-info w-100" data-mdb-ripple-init>Editar</button>
                </div>
            </div>
        </div>    
        `
    });
    publicaciones=(publicacionesCard=="")?"<div class='col-md-12'><span>Sin publicacions.</span></div>":publicacionesCard
    document.getElementById("listarPublicaciones").innerHTML=publicaciones
}
function obtenerExtension(nombreArchivo) {
    const partes = nombreArchivo.split('.');
    return partes.pop(); // Obtiene la última parte (la extensión)
   
}
function obtenerNombre(nombreArchivo) {
    const partes = nombreArchivo.split('/');
    return partes.pop(); // Obtiene la última parte (la extensión)
   
}
function descargar(direccion) {
    // Simula una descarga (reemplaza con la lógica real)
    window.open(direccion, '_blank');
}
function truncarTexto(texto, limitePalabras) {
    const palabras = texto.split(' ');
    if (palabras.length > limitePalabras) {
        const textoTruncado = palabras.slice(0, limitePalabras).join(' ') + '...';
        return textoTruncado;
    } else {
        return texto; // No es necesario truncar
    }
}
function formatearFecha(fecha) {
    const partes = fecha.split('-');
    if (partes.length === 3) {
        const dia = partes[2];
        const mes = partes[1];
        const anio = partes[0];
        return `${dia}/${mes}/${anio}`;
    } else {
        return 'Fecha inválida';
    }
}

