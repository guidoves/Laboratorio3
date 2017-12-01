/// <reference path="Empleado.ts"/>
$(document).ready(function () {

    $("#btnAgregar").on('click', Alta);
    CargarDatos();
    Filtro2();
});

var imagen: string = '';

function Alta() {

    //Campos formulario
    let nombre = String($('#txtNombre').val());
    let apellido = String($('#txtApellido').val());
    let edad = Number($('#txtEdad').val());
    let legajo = Number($('#txtLegajo').val());
    let foto = imagen;
    if (!BuscarPorLegajo(legajo)) {
        //Crea objeto empleado
        let empleado: Sp.Empleado = new Sp.Empleado(nombre, apellido, edad, legajo, foto);
        // Trae un array con todos los empleados cargados.
        let arrayEmpleados: Sp.Empleado[] = TraerData();
        // Agrega el nuevo empleado al array
        arrayEmpleados.push(empleado);
        // Carga el localstorage con el array acualizado en formato JSON
        localStorage.setItem('empleados', JSON.stringify(arrayEmpleados));
        alert('Empleado agregado!');
        LimpiarForm();
        CargarDatos();
    }
    else { alert('Ya existe el numero de legajo'); }
}

function Borrar(legajo: number) {
    let empleados = TraerData();
    for (let index = 0; index < empleados.length; index++) {
        if (empleados[index]["legajo"] == legajo) {
            empleados.splice(index, 1);
            break;
        }
    }
    localStorage.setItem('empleados', JSON.stringify(empleados));
    CargarDatos();
}

function Modificar(legajo: number) {
    let empleados = TraerData();
    for (let index = 0; index < empleados.length; index++) {
        if (empleados[index]["legajo"] == legajo) {

            $('#txtLegajo').attr('disabled', 'disabled');
            $("#txtNombre").val(empleados[index]['nombre']);
            $("#txtEdad").val(empleados[index]['edad']);
            $("#txtApellido").val(empleados[index]['apellido']);
            //$("#txtFoto").val(empleados[index]['foto']);
            $("#btnAgregar").off('click');
            $("#btnAgregar").html('Modificar Empleado');
            $("#btnAgregar").on('click', function () {
                empleados[index]['nombre'] = $("#txtNombre").val();
                empleados[index]['edad'] = $("#txtEdad").val();
                empleados[index]['apellido'] = $("#txtApellido").val();
                empleados[index]['foto'] = imagen;
                localStorage.setItem('empleados', JSON.stringify(empleados));
                LimpiarForm();
                RestablecerForm();
                CargarDatos();

            });
            break;
        }
    }
}

function BuscarPorLegajo(legajo: number): Boolean {

    let rta: Boolean = false;
    let data = TraerData();
    for (let index = 0; index < data.length; index++) {
        if (data[index]["legajo"] == legajo) {
            rta = true;
            break;
        }
    }
    return rta;
}

function LimpiarForm() {
    $("#txtNombre").val('');
    $('#txtEdad').val('');
    $('#txtLegajo').val('');
    $('#txtApellido').val('');
    $('#txtFoto').val('');
}

function RestablecerForm() {
    $("#btnAgregar").html('Agregar Mascota');
    $("#btnAgregar").off('click');
    $("#btnAgregar").on('click', Alta);
    $('#txtLegajo').removeAttr('disabled');
}

function TraerData() {
    // Obtiene los datos del localstorage
    let data: string | null = localStorage.getItem('empleados');
    // Carga un array con los datos
    let empleados: any[] = data == null ? [] : JSON.parse(data);
    return empleados;
}

function CargarDatos() {
    let empleados = TraerData();
    ActualizarTabla(empleados);
    Metricas();
}

function ActualizarTabla(empleados: any[]) {

    $("#tabla").html("");
    let html = "<table class='table'><thead><th class ='hLegajo'>Legajo</th><th class ='hNombre'>Nombre</th><th class ='hApellido'>Apellido</th><th class ='hEdad'>Edad</th><th class ='hFoto'>Foto</th></thead><tbody>";

    for (let index = 0; index < empleados.length; index++) {

        html += "<tr><td class='hLegajo'>" + empleados[index]["legajo"] + "</td><td class ='hNombre'>" + empleados[index]["nombre"] + "</td><td class ='hApellido'>" + empleados[index]["apellido"] + "</td><td class ='hEdad'>" + empleados[index]["edad"] + "</td><td class ='hFoto'><img width='30' height='30' src='" + empleados[index]["foto"] + "'></td><td><button class='btn btn-warning' onclick='Modificar(" + empleados[index]["legajo"] + ")'>Modificar</button><button class='btn btn-danger' onclick='Borrar(" + empleados[index]["legajo"] + ")'>Borrar</button></td></tr>";
    }

    html += "</tbody></table>";
    $("#tabla").html(html);
}

/*function ActualizarTabla2(empleados: any[]) {

    $("#tabla").html("");
    let html = "<table class='table'><thead><th class ='hLegajo'>Legajo</th><th class ='hNombre'>Nombre</th><th class ='hApellido'>Apellido</th><th class ='hEdad'>Edad</th><th class ='hFoto'>Foto</th></thead><tbody>";

    for (let index = 0; index < empleados.length; index++) {

        html += "<tr><td class='hLegajo'>" + empleados[index].legajo + "</td><td class ='hNombre'>" + empleados[index].nombre + "</td><td class ='hApellido'>" + empleados[index].apellido + "</td><td class ='hEdad'>" + empleados[index]["edad"] + "</td><td class ='hFoto'><img width='30' height='30' src='" + empleados[index]["foto"] + "'></td><td><button class='btn btn-warning' onclick='Modificar(" + empleados[index]["legajo"] + ")'>Modificar</button><button class='btn btn-danger' onclick='Borrar(" + empleados[index]["legajo"] + ")'>Borrar</button></td></tr>";
    }

    html += "</tbody></table>";
    $("#tabla").html(html);
}*/

function TraerImagen() {
    let file = $("#txtFoto").prop('files');
    let retorno;
    if (file.length > 0) {
        let fileToLoad = file[0];
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            let srcData = fileLoadedEvent.target.result;
            imagen = srcData;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

function Filtro() {

    let filtro = $("#sFiltro").val();
    switch (filtro) {
        case 'TODO':
            {
                $(".hLegajo").show();
                $(".hNombre").show();
                $(".hApellido").show();
                $(".hEdad").show();
                $(".hFoto").show();
                break;
            }
        case 'LEGAJO':
            {
                $(".hLegajo").show();
                $(".hNombre").hide();
                $(".hApellido").hide();
                $(".hEdad").hide();
                $(".hFoto").hide();
                break;
            }
        case 'NOMBRE':
            {
                $(".hLegajo").hide();
                $(".hNombre").show();
                $(".hApellido").hide();
                $(".hEdad").hide();
                $(".hFoto").hide();
                break;
            }
        case 'APELLIDO':
            {
                $(".hLegajo").hide();
                $(".hNombre").hide();
                $(".hApellido").show();
                $(".hEdad").hide();
                $(".hFoto").hide();
                break;
            }
        case 'EDAD':
            {
                $(".hLegajo").hide();
                $(".hNombre").hide();
                $(".hApellido").hide();
                $(".hEdad").show();
                $(".hFoto").hide();
                break;
            }
        case 'FOTO':
            {
                $(".hLegajo").hide();
                $(".hNombre").hide();
                $(".hApellido").hide();
                $(".hEdad").hide();
                $(".hFoto").show();
                break;
            }
    }
}

function Filtro2() {

    let empleados = TraerData();
    let resultado = new Object();
    if ($('#chkLegajo').prop('checked')) {
        resultado.legajo = empleados.map(function (empleado) {
            return empleado['legajo'];
        });
    }
    if ($('#chkNombre').prop('checked')) {
        resultado.nombre = empleados.map(function (empleado) {
            return empleado['nombre'];
        });
    }
    if ($('#chkApellido').prop('checked')) {
        resultado.apellido = empleados.map(function (empleado) {
            return empleado['apellido'];
        });
    }
    if ($('#chkEdad').prop('checked')) {
        resultado.edad = empleados.map(function (empleado) {
            return empleado['edad'];
        });
    }
    if ($('#chkFoto').prop('checked')) {
        resultado.foto = empleados.map(function (empleado) {
            return empleado['foto'];
        });
    }
    //ActualizarTabla2(resultado);
}

function Metricas() {
    let empleados = TraerData();
    let sumEdad: number = 0;
    if (empleados.length != 0) {

        for (let index = 0; index < empleados.length; index++) {
            sumEdad += Number(empleados[index]['edad']);
        }
        $("#mCantidad").val(empleados.length);
        $("#mPromedio").val(sumEdad / empleados.length);
    }
    else {
        $("#mCantidad").val(0);
        $("#mPromedio").val(0);
    }
}

