document.getElementById("loginForm").addEventListener("submit",async (e)=>{
    e.preventDefault()
    let form=new FormData(document.getElementById("loginForm"))
    await fetch(`php/loguear.php`,{
        method:"POST",
        body:form,
    })
    .then(response => response.json())
    .then(async (data)=>{
        console.log(data)
        if(data=="mal"){
            document.getElementById("loginForm").reset()
            $("#error").modal("show")
        }else{
            localStorage.setItem("user", JSON.stringify(data));
           /*  localStorage.getItem("user"); */
            /* console.log(localStorage.getItem("user")) */
            location.href="../admin/index.html"

        }
    });
})
