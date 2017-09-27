//HTTP
var xhr;

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

function agregarServer(){

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var persona = { "nombre" : nombre , "apellido" : apellido };
    //alert(JSON.stringify(persona));
   // var data = "nombre=" + encodeURIComponent(nombre) + "&apellido=" + encodeURIComponent(apellido);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuesta;
    xhr.open('POST',"http://localhost:3000/agregarpersona",true);
    xhr.setRequestHeader("Content-type", "application/json");
    //xhr.send(data);
    xhr.send(JSON.stringify(persona));

    
}

function gestionarRespuesta(){

    alert(xhr.responseText);
}

window.onload = function()
{
    var btnGuardar = document.getElementById("guardar");
    btnGuardar.addEventListener('click',function()
    {
        agregarServer();        
    })
    
}


