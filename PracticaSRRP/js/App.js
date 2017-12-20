"use strict";
/// <reference path='Empleado.ts'/>
$(document).ready(function () {
    $('#btnAlta').on('click', Alta);
    CargarDatos();
});
var imagen = '';
function CargarDatos() {
    var empleados = TraerData();
    ActualizarTabla(empleados);
    //Metricas();
}
function Alta() {
    //Campos Formulario
    var nombre = String($('#txtNombre').val());
    var apellido = String($('#txtApellido').val());
    var dni = Number($('#txtDni').val());
    var fNacimiento = String($('#txtFecha').val());
    var sexo = String($('#txtSexo').val());
    var direccion = String($('#txtDireccion').val());
    var telefono = String($('#txtTelefono').val());
    var estadoCivil = String($('#txtEstadoCivil').val());
    var foto = String($('#txtNombre').val());
    var legajo = EstablecerLegajo();
    var cuil = String($('#txtCuil').val());
    var ingreso = String($('#txtIngreso').val());
    var empleado = new proyecto.Empleado(nombre, apellido, dni, fNacimiento, sexo, direccion, telefono, estadoCivil, foto, legajo, cuil, ingreso);
    var arrayEmpleados = TraerData();
    arrayEmpleados.push(empleado);
    localStorage.setItem('empleados', JSON.stringify(arrayEmpleados));
    alert('Empleado dado de alta');
    //
}
function TraerData() {
    // Obtiene los datos del localstorage
    var data = localStorage.getItem('empleados');
    // Carga un array con los datos. decodifica el json.
    var empleadosData = data == null ? [] : JSON.parse(data);
    // Crea array del tipo de dato empleado,
    var arrayEmpleados = [];
    if (empleadosData != null) {
        for (var index = 0; index < empleadosData.length; index++) {
            var empleado = new proyecto.Empleado(empleadosData[index]['nombre'], empleadosData[index]['apellido'], empleadosData[index]['dni'], empleadosData[index]['fNacimiento'], empleadosData[index]['sexo'], empleadosData[index]['direccion'], empleadosData[index]['telefono'], empleadosData[index]['estadoCivil'], empleadosData[index]['foto'], empleadosData[index]['legajo'], empleadosData[index]['cuil'], empleadosData[index]['ingreso']);
            arrayEmpleados.push(empleado);
        }
    }
    return arrayEmpleados;
}
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
function ActualizarTabla(empleados) {
    if (empleados.length > 0) {
        $("#tabla").html("");
        var html = "<table class='table table-hover'><thead><th class ='hLegajo'>Legajo</th><th class ='hNombre'>Nombre</th><th class ='hApellido'>Apellido</th><th class ='hDni'>Dni</th></thead><tbody>";
        for (var index = 0; index < empleados.length; index++) {
            html += "<tr><td class='hLegajo'>" + empleados[index].legajo + "</td><td class='hNombre'>" + empleados[index].nombre + "</td><td class ='hApellido'>" + empleados[index].apellido + "</td><td class ='hDni'>" + empleados[index].dni + "</td><td><button class='btn btn-info' onclick=''>Ver</button></td></tr>";
        }
        html += "</tbody></table>";
        $("#tabla").html(html);
    }
}
function EstablecerLegajo() {
    if (localStorage.getItem('legajo') != null) {
        var legajo = parseInt(String(localStorage.getItem('legajo')));
        legajo++;
        localStorage.setItem('legajo', legajo.toString());
        return legajo;
    }
    else {
        localStorage.setItem('legajo', '1');
        return 1;
    }
}
