
function agregar()
{
    var txtNombre = document.getElementById("nombre");
    var txtApellido = document.getElementById("apellido");

    var tCuerpo = document.getElementById("tCuerpo");

    tCuerpo.innerHTML = tCuerpo.innerHTML + 
    "<td>" + txtNombre.value + "</td>" +
    "<td>" + txtApellido.value + "</td>" +
    "<td><a href=\"\">Borrar</a>"; 
}

window.onload = function()
{
    var btnGuardar = document.getElementById("guardar");
    btnGuardar.addEventListener('click',function()
    {
        agregar();        
    })
    
}


