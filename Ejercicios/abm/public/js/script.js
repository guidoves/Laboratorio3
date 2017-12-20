var xhr;

window.addEventListener('load', () => {

    var btnAgregar = document.getElementById('btnEnviar');
    btnAgregar.addEventListener("click", AgregarPersona);

    var iNombre = document.getElementById('nombre');
    var iApellido = document.getElementById('apellido');
    iNombre.addEventListener('keypress', restaurarBorder);
    iApellido.addEventListener('keypress', restaurarBorder);

});
window.addEventListener('load', TraerPersonas);


function AgregarPersona() {

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;

    if (nombre != '' && apellido != '') {

        var persona = "nombre=" + nombre + "&apellido=" + apellido;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                alert(xhr.response);
                TraerPersonas();
            }
        };
        xhr.open("POST", "http://localhost:3000/agregarpersona", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(persona);

    }
    else {
        EstiloError();
    }
}

function EliminarPersona(i) {

    var req = "indice=" + i;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

            TraerPersonas();
        }
    };
    xhr.open("POST", "http://localhost:3000/eliminarpersona", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(req);

}

function ModificarPersona(i) {

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

            var persona = JSON.parse(xhr.response);
            document.getElementById('nombre').value = persona.nombre;
            document.getElementById('apellido').value = persona.apellido;
            document.getElementById('btnEnviar').removeEventListener("click", AgregarPersona);
            document.getElementById('btnEnviar').value = "MODIFICAR";
            document.getElementById('btnEnviar').addEventListener("click", Modificar);

            function Modificar() {

                var nombre = document.getElementById('nombre').value;
                var apellido = document.getElementById('apellido').value;

                if (nombre != '' && apellido != '') {

                    var personaJson = { "nombre": nombre, "apellido": apellido};
                    xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                            
                            
                            location.reload();
                            
                        }
                    };
                    xhr.open("POST", "http://localhost:3000/modificarpersona", true);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.send("indice=" + i + "&persona=" + JSON.stringify(personaJson));
                }
                else {
                    EstiloError();
                }
            }
        }
    };
    xhr.open("GET", "http://localhost:3000/traerpersona?indice=" + i, true);
    xhr.send();

}

function EstiloError() {

    document.getElementById('nombre').style.borderColor = "red";
    document.getElementById('apellido').style.borderColor = "red";
    document.getElementById('msjError').innerHTML = "Debe ingresar nombre y apellido";
}

function restaurarBorder() {
    document.getElementById('nombre').style.borderColor = "";
    document.getElementById('apellido').style.borderColor = "";
    document.getElementById('msjError').innerHTML = "";

}

function TraerPersonas() {


    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

            CargarHTML(JSON.parse(xhr.response));
        }
    };
    xhr.open("GET", "http://localhost:3000/traerpersonas", true);
    xhr.send();

}

function CargarHTML(a) {

    var tbody = document.getElementById('body');
    tbody.innerHTML = "";
    var i = 0;

    for (i = 0; i < a.length; i++) {

        tbody.innerHTML += "<tr><td>" + a[i].nombre + "</td><td>" + a[i].apellido + "</td><td id='" + i + "' class='accion'><input class='btn btn-primary btn-sm' type='button' value='Modificar' onclick=ModificarPersona(" + i + ")> <input class='btn btn-danger btn-sm' type='button' value='Eliminar' onclick=EliminarPersona(" + i + ")></td></tr>";
    }
}

