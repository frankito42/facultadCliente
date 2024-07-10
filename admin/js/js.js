let user
let modalNewPublicacion = document.getElementById("newPublicacion")
let modalNewP = new mdb.Modal(modalNewPublicacion)
   
document.addEventListener('DOMContentLoaded', function() {
    // Tu código aquí

    document.getElementById("cerrarSesion").addEventListener("click",()=>{
        localStorage.clear()
        location.href="../login/php/logout.php"
    })
    /* SALUDA AL USUARIO */
    saludar()
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
    }else{
        toastr.success("Se guardo la publicacion con exito", 'Exito!')
        document.getElementById('nuevaPublicacion').reset()

    }

}


