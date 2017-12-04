var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Sp;
(function (Sp) {
    var Sexo;
    (function (Sexo) {
        Sexo[Sexo["Masculino"] = 0] = "Masculino";
        Sexo[Sexo["Femenino"] = 1] = "Femenino";
    })(Sexo = Sp.Sexo || (Sp.Sexo = {}));
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad, sexo) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.sexo = sexo;
        }
        Persona.prototype.toJson = function () {
            var personaJson = "{'nombre':'" + this.nombre + "','apellido':'" + this.apellido + "','edad':'" + this.edad + "'}";
            return personaJson;
        };
        return Persona;
    }());
    Sp.Persona = Persona;
})(Sp || (Sp = {}));
/// <reference path="Persona.ts"/>
var Sp;
(function (Sp) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, edad, legajo, foto, id, sexo) {
            var _this = _super.call(this, nombre, apellido, edad, sexo) || this;
            _this.legajo = legajo;
            _this.foto = foto;
            _this.id = id;
            return _this;
        }
        Empleado.prototype.toJson = function () {
            var str = _super.prototype.toJson.call(this).replace("}", ",");
            var returnJson = str + ("'legajo':'" + this.legajo + "','foto':'" + this.foto + "'}");
            return returnJson;
        };
        return Empleado;
    }(Sp.Persona));
    Sp.Empleado = Empleado;
})(Sp || (Sp = {}));
/// <reference path="Empleado.ts"/>
$(document).ready(function () {
    $("#btnAgregar").on('click', Alta);
    //CargarDatos();
    Filtro2();
    Filtro();
});
var imagen = '';
function Alta() {
    //Campos formulario
    var nombre = String($('#txtNombre').val());
    var apellido = String($('#txtApellido').val());
    var edad = Number($('#txtEdad').val());
    var legajo = Number($('#txtLegajo').val());
    var foto = imagen;
    var sexo = String($('#txtSexo').val());
    if (!BuscarPorLegajo(legajo) && legajo > 0) {
        //Crea objeto empleado
        var empleado = new Sp.Empleado(nombre, apellido, edad, legajo, foto, EstablecerId(), sexo);
        // Trae un array con todos los empleados cargados.
        var arrayEmpleados = TraerData();
        // Agrega el nuevo empleado al array
        arrayEmpleados.push(empleado);
        // Carga el localstorage con el array acualizado en formato JSON
        localStorage.setItem('empleados', JSON.stringify(arrayEmpleados));
        alert('Empleado agregado');
        LimpiarForm();
        //CargarDatos();
        Filtro2();
    }
    else {
        alert('Ya existe el numero de legajo o es invalido');
    }
}
function Borrar(legajo) {
    var empleados = TraerData();
    for (var index = 0; index < empleados.length; index++) {
        if (empleados[index].legajo == legajo) {
            empleados.splice(index, 1);
            break;
        }
    }
    localStorage.setItem('empleados', JSON.stringify(empleados));
    alert('Empleado Eliminado');
    Filtro2();
}
function Modificar(legajo) {
    var empleados = TraerData();
    var _loop_1 = function (index) {
        if (empleados[index].legajo == legajo) {
            $('#txtLegajo').attr('disabled', 'disabled');
            $("#txtNombre").val(empleados[index].nombre);
            $("#txtEdad").val(empleados[index].edad);
            $("#txtApellido").val(empleados[index].apellido);
            $("#txtSexo").val(empleados[index].sexo);
            $("#btnAgregar").off('click');
            $("#btnAgregar").html('Modificar Empleado');
            $("#btnAgregar").on('click', function () {
                empleados[index].nombre = String($("#txtNombre").val());
                empleados[index].edad = Number($("#txtEdad").val());
                empleados[index].apellido = String($("#txtApellido").val());
                empleados[index].sexo = String($("#txtSexo").val());
                empleados[index].foto = imagen;
                localStorage.setItem('empleados', JSON.stringify(empleados));
                alert('Empleado Modificado');
                LimpiarForm();
                RestablecerForm();
                Filtro2();
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
function EstablecerId() {
    if (localStorage.getItem('id') != null) {
        var id = parseInt(String(localStorage.getItem('id')));
        id++;
        localStorage.setItem('id', id.toString());
        return id;
    }
    else {
        localStorage.setItem('id', '1');
        return 1;
    }
}
function BuscarPorLegajo(legajo) {
    var rta = false;
    var data = TraerData();
    for (var index = 0; index < data.length; index++) {
        if (data[index].legajo == legajo) {
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
    $("#btnAgregar").html('Agregar Empleado');
    $("#btnAgregar").off('click');
    $("#btnAgregar").on('click', Alta);
    $('#txtLegajo').removeAttr('disabled');
    //$('#chkId').prop('checked','true');
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
            var empleado = new Sp.Empleado(empleadosData[index]['nombre'], empleadosData[index]['apellido'], empleadosData[index]['edad'], empleadosData[index]['legajo'], empleadosData[index]['foto'], empleadosData[index]['id'], empleadosData[index]['sexo']);
            arrayEmpleados.push(empleado);
        }
    }
    return arrayEmpleados;
}
function CargarDatos() {
    var empleados = TraerData();
    ActualizarTabla(empleados);
    Metricas();
}
function ActualizarTabla(empleados) {
    $("#tabla").html("");
    var html = "<table class='table'><thead><th class ='hId'>Id</th><th class ='hLegajo'>Legajo</th><th class ='hNombre'>Nombre</th><th class ='hApellido'>Apellido</th><th class ='hEdad'>Edad</th><th class ='hSexo'>Sexo</th><th class ='hFoto'>Foto</th></thead><tbody>";
    if (empleados != null) {
        for (var index = 0; index < empleados.length; index++) {
            html += "<tr><td class='hId'>" + empleados[index].id + "</td><td class='hLegajo'>" + empleados[index].legajo + "</td><td class ='hNombre'>" + empleados[index].nombre + "</td><td class ='hApellido'>" + empleados[index].apellido + "</td><td class ='hEdad'>" + empleados[index].edad + "</td><td class='hSexo'>" + empleados[index].sexo + "</td><td class ='hFoto'><img width='60' height='60' src='" + empleados[index].foto + "'></td><td><button class='btn btn-warning' onclick='Modificar(" + empleados[index].legajo + ")'>Modificar</button><button class='btn btn-danger' onclick='Borrar(" + empleados[index].legajo + ")'>Borrar</button></td></tr>";
        }
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
function Filtro2() {
    var empleados = TraerData();
    var legajo = [];
    var nombre = [];
    var apellido = [];
    var edad = [];
    var foto = [];
    var id = [];
    var sexo = [];
    var resultado = [];
    var flag = false;
    if ($('#chkId').prop('checked')) {
        id = empleados.map(function (empleado) {
            return empleado.id;
        });
        flag = true;
    }
    if ($('#chkLegajo').prop('checked')) {
        legajo = empleados.map(function (empleado) {
            return empleado.legajo;
        });
        flag = true;
    }
    if ($('#chkNombre').prop('checked')) {
        nombre = empleados.map(function (empleado) {
            return empleado.nombre;
        });
        flag = true;
    }
    if ($('#chkApellido').prop('checked')) {
        apellido = empleados.map(function (empleado) {
            return empleado.apellido;
        });
        flag = true;
    }
    if ($('#chkEdad').prop('checked')) {
        edad = empleados.map(function (empleado) {
            return empleado.edad;
        });
        flag = true;
    }
    if ($('#chkSexo').prop('checked')) {
        sexo = empleados.map(function (empleado) {
            return empleado.sexo;
        });
        flag = true;
    }
    if ($('#chkFoto').prop('checked')) {
        foto = empleados.map(function (empleado) {
            return empleado.foto;
        });
        flag = true;
    }
    if (flag) {
        for (var index = 0; index < empleados.length; index++) {
            var objeto = new Object();
            objeto.legajo = empleados[index].legajo;
            objeto.nombre = nombre[index];
            objeto.apellido = apellido[index];
            objeto.edad = edad[index];
            objeto.foto = foto[index];
            objeto.id = id[index];
            objeto.sexo = sexo[index];
            resultado.push(objeto);
        }
    }
    ActualizarTabla(resultado);
    $(".hLegajo").hide();
    $(".hNombre").hide();
    $(".hApellido").hide();
    $(".hEdad").hide();
    $(".hFoto").hide();
    $(".hId").hide();
    $(".hSexo").hide();
    if ($('#chkLegajo').prop('checked'))
        $(".hLegajo").show();
    if ($('#chkNombre').prop('checked'))
        $(".hNombre").show();
    if ($('#chkApellido').prop('checked'))
        $(".hApellido").show();
    if ($('#chkEdad').prop('checked'))
        $(".hEdad").show();
    if ($('#chkFoto').prop('checked'))
        $(".hFoto").show();
    if ($('#chkSexo').prop('checked'))
        $('.hSexo').show();
    if ($('#chkId').prop('checked'))
        $(".hId").show();
    //Metricas(resultado);
}
function Metricas(data) {
    //let empleados = TraerData();
    var sumEdad = 0;
    if (data.length != 0) {
        for (var index = 0; index < data.length; index++) {
            sumEdad += Number(data[index].edad);
        }
        $("#mCantidad").val(data.length);
        $("#mPromedio").val(sumEdad / data.length);
    }
    else {
        $("#mCantidad").val(0);
        $("#mPromedio").val(0);
    }
}
function Filtro() {
    var filtro = $('#sFiltro').val();
    var data = TraerData();
    switch (filtro) {
        case 'TODO':
            {
                Metricas(data);
                break;
            }
        case 'E2030':
            {
                var dataFil = data.filter(function (empleado) {
                    return empleado.edad >= 20 && empleado.edad <= 30;
                });
                Metricas(dataFil);
                break;
            }
        case 'E3160':
            {
                var dataFil = data.filter(function (empleado) {
                    return empleado.edad >= 31 && empleado.edad <= 60;
                });
                Metricas(dataFil);
                break;
            }
        case 'E60':
            {
                var dataFil = data.filter(function (empleado) {
                    return empleado.edad > 60;
                });
                Metricas(dataFil);
                break;
            }
        case 'HOMBRES':
            {
                var dataFil = data.filter(function (empleado) {
                    return empleado.sexo == 'Masculino';
                });
                Metricas(dataFil);
                break;
            }
        case 'MUJERES':
            {
                var dataFil = data.filter(function (empleado) {
                    return empleado.sexo == 'Femenino';
                });
                Metricas(dataFil);
                break;
            }
    }
}
