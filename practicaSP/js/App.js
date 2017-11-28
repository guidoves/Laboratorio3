"use strict";
/// <reference path="Mascotas.ts"/>
$(document).ready(function () {
    $("#btnAgregar").on('click', AgregarAnimal);
    ObtenerData();
});
function AgregarAnimal() {
    var nombre = String($("#txtNombre").val());
    var edad = Number($("#txtEdad").val());
    var patas = Number($("#sPatas").val());
    var tipo = String($("#sTipo").val());
    var id = Number($("#txtId").val());
    if (!BuscarPorId(id)) {
        switch (tipo) {
            case Abm.eTipo.Perro:
                {
                    var animal = new Abm.Perro(nombre, edad, patas, id);
                    var data = localStorage.getItem('data');
                    var dataJson = data == null ? [] : JSON.parse(data);
                    dataJson.push(JSON.parse(animal.toJson()));
                    localStorage.setItem('data', JSON.stringify(dataJson));
                    alert('Mascota guardada!!');
                    break;
                }
            case Abm.eTipo.Gato:
                {
                    var animal = new Abm.Gato(nombre, edad, patas, id);
                    var data = localStorage.getItem('data');
                    var dataJson = data == null ? [] : JSON.parse(data);
                    dataJson.push(JSON.parse(animal.toJson()));
                    localStorage.setItem('data', JSON.stringify(dataJson));
                    alert('Mascota guardada!!');
                    break;
                }
            case Abm.eTipo.Ave:
                {
                    var animal = new Abm.Ave(nombre, edad, patas, id);
                    var data = localStorage.getItem('data');
                    var dataJson = data == null ? [] : JSON.parse(data);
                    dataJson.push(JSON.parse(animal.toJson()));
                    localStorage.setItem('data', JSON.stringify(dataJson));
                    alert('Mascota guardada!!');
                    break;
                }
            case Abm.eTipo.Pez:
                {
                    var animal = new Abm.Pez(nombre, edad, patas, id);
                    var data = localStorage.getItem('data');
                    var dataJson = data == null ? [] : JSON.parse(data);
                    dataJson.push(JSON.parse(animal.toJson()));
                    localStorage.setItem('data', JSON.stringify(dataJson));
                    alert('Mascota guardada!!');
                    break;
                }
            case Abm.eTipo.Roedor:
                {
                    var animal = new Abm.Roedor(nombre, edad, patas, id);
                    var data = localStorage.getItem('data');
                    var dataJson = data == null ? [] : JSON.parse(data);
                    dataJson.push(JSON.parse(animal.toJson()));
                    localStorage.setItem('data', JSON.stringify(dataJson));
                    alert('Mascota guardada!!');
                    break;
                }
        }
        ObtenerData();
        LimpiarForm();
    }
    else {
        LimpiarForm();
        alert('Ya existe el id');
    }
}
function LimpiarForm() {
    $("#txtNombre").val('');
    $('#txtEdad').val('');
    $('#txtId').val('');
    $('#txtsPatas').val(0);
    $('#txtsTipo').val(0);
    $("#btnAgregar").html('Agregar Mascota');
    $("#btnAgregar").on('click', AgregarAnimal);
    $('#txtId').removeAttr('disabled');
}
function ObtenerData() {
    var data = localStorage.getItem('data');
    if (data != null) {
        var dataJson = JSON.parse(data);
        ArmarTabla(dataJson);
    }
}
function BuscarPorId(id) {
    var rta = false;
    var data = localStorage.getItem('data');
    if (data != null) {
        var dataJson = JSON.parse(data);
        for (var index = 0; index < dataJson.length; index++) {
            if (dataJson[index]["id"] == id)
                rta = true;
        }
    }
    return rta;
}
function ArmarTabla(data) {
    $("#tabla").html("");
    var html = "<table class='table'><thead><th>Id</th><th>Nombre</th><th>Edad</th><th>Patas</th><th>Tipo</th></thead>"
        + "<tbody>";
    for (var index = 0; index < data.length; index++) {
        html += "<tr><td>" + data[index]["id"] + "</td><td>" + data[index]["nombre"] + "</td><td>" + data[index]["edad"] + "</td><td>" + data[index]["patas"] + "</td><td>" + data[index]["tipo"] + "</td><td><button onclick='Borrar(" + data[index]["id"] + ")'>Borrar</button><button onclick='Modificar(" + data[index]["id"] + ")'>Modificar</button></td></tr>";
    }
    html += "</tboby></table>";
    $("#tabla").html(html);
}
function Borrar(id) {
    var data = localStorage.getItem('data');
    var dataJson = JSON.parse(data);
    for (var index = 0; index < dataJson.length; index++) {
        if (dataJson[index]["id"] == id) {
            dataJson.splice(index, 1);
        }
    }
    localStorage.setItem('data', JSON.stringify(dataJson));
    ObtenerData();
}
function Modificar(id) {
    var data = localStorage.getItem('data');
    var dataJson = JSON.parse(data);
    var _loop_1 = function (index) {
        if (dataJson[index]["id"] == id) {
            $('#txtId').attr('disabled', 'disabled');
            $("#txtNombre").val(dataJson[index]['nombre']);
            $("#txtEdad").val(dataJson[index]['edad']);
            $("#sPatas").val(dataJson[index]['patas']);
            $("#sTipo").val(dataJson[index]['tipo']);
            $("#btnAgregar").off('click');
            $("#btnAgregar").html('Modificar Mascota');
            $("#btnAgregar").on('click', function () {
                dataJson[index]['nombre'] = $("#txtNombre").val();
                dataJson[index]['edad'] = $("#txtEdad").val();
                dataJson[index]['patas'] = $("#sPatas").val();
                dataJson[index]['tipo'] = $("#sTipo").val();
                localStorage.setItem('data', JSON.stringify(dataJson));
                LimpiarForm();
                ObtenerData();
            });
        }
    };
    for (var index = 0; index < dataJson.length; index++) {
        _loop_1(index);
    }
}
