"use strict";
/// <reference path="Empleado.ts"/>
$(document).ready(function () {
    $("#btnAgregar").on('click', Alta);
    CargarDatos();
    Filtro2();
});
var imagen = '';
function Alta() {
    //Campos formulario
    var nombre = String($('#txtNombre').val());
    var apellido = String($('#txtApellido').val());
    var edad = Number($('#txtEdad').val());
    var legajo = Number($('#txtLegajo').val());
    var foto = imagen;
    if (!BuscarPorLegajo(legajo)) {
        //Crea objeto empleado
        var empleado = new Sp.Empleado(nombre, apellido, edad, legajo, foto);
        // Trae un array con todos los empleados cargados.
        var arrayEmpleados = TraerData();
        // Agrega el nuevo empleado al array
        arrayEmpleados.push(empleado);
        // Carga el localstorage con el array acualizado en formato JSON
        localStorage.setItem('empleados', JSON.stringify(arrayEmpleados));
        alert('Empleado agregado!');
        LimpiarForm();
        CargarDatos();
    }
    else {
        alert('Ya existe el numero de legajo');
    }
}
function Borrar(legajo) {
    var empleados = TraerData();
    for (var index = 0; index < empleados.length; index++) {
        if (empleados[index]["legajo"] == legajo) {
            empleados.splice(index, 1);
            break;
        }
    }
    localStorage.setItem('empleados', JSON.stringify(empleados));
    CargarDatos();
}
function Modificar(legajo) {
    var empleados = TraerData();
    var _loop_1 = function (index) {
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
            return "break";
        }
    };
    for (var index = 0; index < empleados.length; index++) {
        var state_1 = _loop_1(index);
        if (state_1 === "break")
            break;
    }
}
function BuscarPorLegajo(legajo) {
    var rta = false;
    var data = TraerData();
    for (var index = 0; index < data.length; index++) {
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
    var data = localStorage.getItem('empleados');
    // Carga un array con los datos
    var empleados = data == null ? [] : JSON.parse(data);
    return empleados;
}
function CargarDatos() {
    var empleados = TraerData();
    ActualizarTabla(empleados);
    Metricas();
}
function ActualizarTabla(empleados) {
    $("#tabla").html("");
    var html = "<table class='table'><thead><th class ='hLegajo'>Legajo</th><th class ='hNombre'>Nombre</th><th class ='hApellido'>Apellido</th><th class ='hEdad'>Edad</th><th class ='hFoto'>Foto</th></thead><tbody>";
    for (var index = 0; index < empleados.length; index++) {
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
    var file = $("#txtFoto").prop('files');
    var retorno;
    if (file.length > 0) {
        var fileToLoad = file[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result;
            imagen = srcData;
        };
        fileReader.readAsDataURL(fileToLoad);
    }
}
function Filtro() {
    var filtro = $("#sFiltro").val();
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
    var empleados = TraerData();
    var resultado = new Object();
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
    var empleados = TraerData();
    var sumEdad = 0;
    if (empleados.length != 0) {
        for (var index = 0; index < empleados.length; index++) {
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
