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
var proyecto;
(function (proyecto) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, dni, fNacimiento, sexo, direccion, telefono, estadoCivil, foto) {
            this.apellido = apellido;
            this.direccion = direccion;
            this.dni = dni;
            this.estadoCivil = estadoCivil;
            this.fNacimiento = fNacimiento;
            this.nombre = nombre;
            this.sexo = sexo;
            this.telefono = telefono;
            this.foto = foto;
            this.edad = CalcularEdad(fNacimiento);
        }
        return Persona;
    }());
    proyecto.Persona = Persona;
})(proyecto || (proyecto = {}));
/// <reference path='Persona.ts'/>
var proyecto;
(function (proyecto) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, dni, fNacimiento, sexo, direccion, telefono, estadoCivil, foto, legajo, cuil, ingreso, egreso, estado) {
            var _this = _super.call(this, nombre, apellido, dni, fNacimiento, sexo, direccion, telefono, estadoCivil, foto) || this;
            _this.cuil = cuil;
            _this.ingreso = ingreso;
            _this.legajo = legajo;
            if (estado == undefined) {
                _this.estado = 'ACTIVO';
            }
            else {
                _this.estado = estado;
            }
            if (egreso == undefined) {
            }
            else {
                _this.egreso = egreso;
            }
            return _this;
        }
        return Empleado;
    }(proyecto.Persona));
    proyecto.Empleado = Empleado;
})(proyecto || (proyecto = {}));
/// <reference path='Empleado.ts'/>
$(document).ready(function () {
    $('#btnAltaCerrar').on('click', function () {
        $("#frmAlta").trigger("reset");
    });
    $('#btnBajaCerrar').on('click', function () {
        $("#bajaBody").html('');
        $("#bajaBusqueda").val("");
    });
    $('#btnModificarCerrar').on('click', function () {
        $("#modificarBody").html('');
        $("#modificarBusqueda").val('');
    });
    CargarDatos();
});
var imagen = '';
function CargarDatos() {
    var empleados = TraerActivos();
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
    var foto = imagen;
    var legajo = EstablecerLegajo();
    var cuil = String($('#txtCuil').val());
    var ingreso = String($('#txtIngreso').val());
    var empleado = new proyecto.Empleado(nombre, apellido, dni, fNacimiento, sexo, direccion, telefono, estadoCivil, foto, legajo, cuil, ingreso);
    var arrayEmpleados = TraerData();
    arrayEmpleados.push(empleado);
    localStorage.setItem('empleados', JSON.stringify(arrayEmpleados));
    alert('Empleado dado de alta');
    $('#btnAltaCerrar').click(); //$('#alta').hide();
    CargarDatos();
    //
}
function Modificar(legajo) {
    var empleados = TraerData();
    var nombre = $('#mdNombre').val();
    var apellido = $('#mdApellido').val();
    var dni = $('#mdDni').val();
    var fNacimiento = $('#mdFecha').val();
    var direccion = $('#mdDireccion').val();
    var telefono = $('#mdTelefono').val();
    var sexo = $('#mdSexo').val();
    var estadoCivil = $('#mdEstadoCivil').val();
    var cuil = $('#mdCuil').val();
    var ingreso = $('#mdIngreso').val();
    var foto = $('#mdFoto').val();
    for (var index = 0; index < empleados.length; index++) {
        if (empleados[index].legajo == legajo) {
            empleados[index].apellido = String(apellido);
            empleados[index].nombre = String(nombre);
            empleados[index].dni = Number(dni);
            empleados[index].fNacimiento = String(fNacimiento);
            empleados[index].direccion = String(direccion);
            empleados[index].telefono = String(telefono);
            empleados[index].sexo = String(sexo);
            empleados[index].estadoCivil = String(estadoCivil);
            empleados[index].cuil = String(cuil);
            empleados[index].ingreso = String(ingreso);
            empleados[index].foto = String(foto);
            break;
        }
    }
    localStorage.setItem('empleados', JSON.stringify(empleados));
    alert('Empleado modificado');
    $('#btnModificarCerrar').click();
    CargarDatos();
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
}
function BuscarPorLegajo(legajo) {
    var data = TraerActivos();
    var retorno = data.filter(function (empleado) {
        return empleado.legajo == legajo;
    });
    return retorno;
}
function Baja(legajo) {
    var fEgreso = String($('#txtEgreso').val());
    var data = TraerData();
    for (var index = 0; index < data.length; index++) {
        if (data[index].legajo == legajo) {
            data[index].egreso = fEgreso;
            data[index].estado = 'BAJA';
            break;
        }
    }
    localStorage.setItem('empleados', JSON.stringify(data));
    alert('Empleado dado de baja');
    $('#btnBajaCerrar').click();
    $('#btnConfirmaCerrar').click();
    CargarDatos();
}
function BajaModal() {
    var busqueda = $('#bajaBusqueda').val();
    var empleado = BuscarPorLegajo(Number(busqueda));
    if (empleado.length > 0) {
        var html = '<div><label>Nombre:&nbsp</label>' + empleado[0].nombre + '<img align="right" height="150" src="' + empleado[0].foto + '"><div><br>' +
            '<div><label>Apellido:&nbsp</label>' + empleado[0].apellido + '</div><br>' +
            '<div><label>Dni:&nbsp</label>' + empleado[0].dni + '</div><br>' +
            '<div><label>Sexo:&nbsp</label>' + empleado[0].sexo + '</div><br>' +
            '<div><label>Estado Civil:&nbsp</label>' + empleado[0].estadoCivil + '</div><br>' +
            '<div><label>Fecha de Nacimiento:&nbsp</label>' + empleado[0].fNacimiento + '</div><br>' +
            '<div><label>Telefono:&nbsp</label>' + empleado[0].telefono + '</div><br>' +
            '<div><label>Direccion:&nbsp</label>' + empleado[0].direccion + '</div><br><hr>' +
            '<h2>Datos Laborales</h2><hr>' +
            '<div><label>Legajo:&nbsp</label>' + empleado[0].legajo + '</div><br>' +
            '<div><label>Cuil:&nbsp</label>' + empleado[0].cuil + '</div><br>' +
            '<div><label>Fecha de Ingreso:&nbsp</label>' + empleado[0].ingreso + '</div><br><hr>' +
            '<div><button class="btn btn-warning" data-toggle="modal" data-target="#confirmarBaja">Dar de Baja</button></div>';
        $('#bajaBody').html(html);
        var html2 = '<button type="button" class="btn btn-danger" onclick="Baja(' + empleado[0].legajo + ')">Aceptar</button>' +
            '<button id="btnConfirmaCerrar" type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>';
        $('#confirmarFooter').html(html2);
    }
    else {
        var html = '<div class="alert alert-info"><strong>No hay resultados</strong></div>';
        $('#bajaBody').html(html);
    }
}
function ModificarModal() {
    var busqueda = $('#modificarBusqueda').val();
    var empleado = BuscarPorLegajo(Number(busqueda));
    if (empleado.length > 0) {
        var html = '<form id="frmModificar" onsubmit="Modificar(' + empleado[0].legajo + ')">' +
            '<div class="form-group"><input value="' + empleado[0].nombre + '" class="form-control" type="text" id="mdNombre" placeholder="Nombre" required/></div>' +
            '<div class="form-group"><input value="' + empleado[0].apellido + '" class="form-control" type="text" id="mdApellido" placeholder="Apellido" required/></div>' +
            '<div class="form-group"><input value="' + empleado[0].dni + '" class="form-control" type="text" id="mdDni" placeholder="Dni" required/></div>' +
            '<div class="form-group"><label for="mdFecha">Fecha de Nacimiento</label><input value="' + empleado[0].fNacimiento + '" class="form-control" type="date" id="mdFecha" required/></div>' +
            '<div class="form-group"><input value="' + empleado[0].direccion + '" class="form-control" type="txt" id="mdDireccion" placeholder="Direccion" required/></div>' +
            '<div class="form-group"><input value="' + empleado[0].telefono + '" class="form-control" type="tel" id="mdTelefono" placeholder="Telefono" required/></div>' +
            '<div class="radio"><label><input type="radio" id="mdSexo" name="mdSexo" value="Masculino" checked>Masculino</label></div><div class="radio"><label><input type="radio" id="mdSexo" name="mdSexo" value="Femenino">Femenino</label></div><hr>' +
            '<label for="">Estado Civil</label><div class="radio"><label><input type="radio" id="mdEstadoCivil" name="mdEstadoCivil" value="Soltero" checked>Soltero</label></div><div class="radio"><label><input type="radio" id="mdEstadoCivil" name="mdEstadoCivil" value="Casado">Casado</label></div>' +
            '<div class="form-group"><input value="' + empleado[0].cuil + '" class="form-control" type="text" id="mdCuil" placeholder="Cuil" required/></div>' +
            '<div class="form-group"><label for="mdIngreso">Fecha de Ingreso</label><input value="' + empleado[0].ingreso + '" class="form-control" type="date" id="mdIngreso" required/></div>' +
            '<div><hr><div class="form-group"><label for="mdFoto">Foto</label><input type="file" accept="image/*" name="" id="mdFoto" onchange="TraerImagen()" required/></div>' +
            '<input class="btn btn-success" type="submit" value="Modificar Empleado"></div></form>';
        $('#modificarBody').html(html);
    }
    else {
        var html = '<div class="alert alert-info"><strong>No hay resultados</strong></div>';
        $('#modificarBody').html(html);
    }
}
function Ver(legajo) {
    var html = '<h2>Datos Personales</h2><hr>';
    var empleados = BuscarPorLegajo(legajo);
    html += '<div><label>Nombre:&nbsp</label>' + empleados[0].nombre + '<img align="right" height="150" src="' + empleados[0].foto + '"><div><br>' +
        '<div><label>Apellido:&nbsp</label>' + empleados[0].apellido + '</div><br>' +
        '<div><label>Dni:&nbsp</label>' + empleados[0].dni + '</div><br>' +
        '<div><label>Edad:&nbsp</label>' + empleados[0].edad + '</div><br>' +
        '<div><label>Sexo:&nbsp</label>' + empleados[0].sexo + '</div><br>' +
        '<div><label>Estado Civil:&nbsp</label>' + empleados[0].estadoCivil + '</div><br>' +
        '<div><label>Fecha de Nacimiento:&nbsp</label>' + empleados[0].fNacimiento + '</div><br>' +
        '<div><label>Telefono:&nbsp</label>' + empleados[0].telefono + '</div><br>' +
        '<div><label>Direccion:&nbsp</label>' + empleados[0].direccion + '</div><br><hr>' +
        '<h2>Datos Laborales</h2><hr>' +
        '<div><label>Legajo:&nbsp</label>' + empleados[0].legajo + '</div><br>' +
        '<div><label>Cuil:&nbsp</label>' + empleados[0].cuil + '</div><br>' +
        '<div><label>Fecha de Ingreso:&nbsp</label>' + empleados[0].ingreso + '</div><br>';
    $('#verBody').html(html);
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
            var empleado = new proyecto.Empleado(empleadosData[index]['nombre'], empleadosData[index]['apellido'], empleadosData[index]['dni'], empleadosData[index]['fNacimiento'], empleadosData[index]['sexo'], empleadosData[index]['direccion'], empleadosData[index]['telefono'], empleadosData[index]['estadoCivil'], empleadosData[index]['foto'], empleadosData[index]['legajo'], empleadosData[index]['cuil'], empleadosData[index]['ingreso'], empleadosData[index]['egreso'], empleadosData[index]['estado']);
            arrayEmpleados.push(empleado);
        }
    }
    return arrayEmpleados;
}
function TraerActivos() {
    var data = TraerData();
    var activos = data.filter(function (empleado) {
        return empleado.estado == 'ACTIVO';
    });
    return activos;
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
            html += "<tr><td class='hLegajo'>" + empleados[index].legajo + "</td><td class='hNombre'>" + empleados[index].nombre + "</td><td class ='hApellido'>" + empleados[index].apellido + "</td><td class ='hDni'>" + empleados[index].dni + "</td><td><button class='btn btn-primary' data-toggle='modal' data-target='#ver' onclick='Ver(" + empleados[index].legajo + ")'>Detalle</button></td></tr>";
        }
        html += "</tbody></table>";
        $("#tabla").html(html);
    }
    else {
        var html = '<table class="table table-hover"><div class="alert alert-info"><strong>No hay datos</strong></div></table>';
        $('#tabla').html(html);
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
function Filtro() {
    var empleados = TraerActivos();
    var legajo = [];
    var nombre = [];
    var apellido = [];
    var dni = [];
    var resultado = [];
    var flag = false;
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
    if ($('#chkDni').prop('checked')) {
        dni = empleados.map(function (empleado) {
            return empleado.dni;
        });
        flag = true;
    }
    if (flag) {
        for (var index = 0; index < empleados.length; index++) {
            var objeto = new Object();
            objeto.legajo = empleados[index].legajo;
            objeto.nombre = nombre[index];
            objeto.apellido = apellido[index];
            objeto.dni = dni[index];
            resultado.push(objeto);
        }
    }
    ActualizarTabla(resultado);
    $(".hLegajo").hide();
    $(".hNombre").hide();
    $(".hApellido").hide();
    $(".hDni").hide();
    if ($('#chkLegajo').prop('checked'))
        $(".hLegajo").show();
    if ($('#chkNombre').prop('checked'))
        $(".hNombre").show();
    if ($('#chkApellido').prop('checked'))
        $(".hApellido").show();
    if ($('#chkDni').prop('checked'))
        $(".hDni").show();
}
function CalcularEdad(fecha) {
    var hoy = new Date();
    var fnac = new Date(fecha);
    var edad = hoy.getFullYear() - fnac.getFullYear();
    var m = hoy.getMonth() - fnac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fnac.getDate())) {
        edad--;
    }
    return edad;
}
function Filtro2() {
    var filtro = $('#sFiltro').val();
    var data = TraerData();
    switch (filtro) {
        case 'TODOS':
            {
                Metricas(data);
                break;
            }
        case 'ACTIVOS':
            {
                var dataFil = data.filter(function (empleado) {
                    return empleado.estado == 'ACTIVO';
                });
                Metricas(dataFil);
                break;
            }
        case 'BAJA':
            {
                var dataFil = data.filter(function (empleado) {
                    return empleado.estado == 'BAJA';
                });
                Metricas(dataFil);
                break;
            }
    }
}
function Metricas(data) {
    //let empleados = TraerData();
    var sumEdad = data.reduce(function (anterior, actual) {
        return anterior + actual.edad;
    }, 0);
    var hombres = data.filter(function (empleado) {
        return empleado.sexo == 'Masculino';
    });
    var mujeres = data.filter(function (empleado) {
        return empleado.sexo == 'Femenino';
    });
    if (data.length != 0) {
        $("#mCantidad").val(data.length);
        $("#mPromedio").val(sumEdad / data.length);
        $("#mHombres").val(hombres.length);
        $("#mMujeres").val(mujeres.length);
    }
    else {
        $("#mCantidad").val(0);
        $("#mPromedio").val(0);
        $("#Hombres").val(0);
        $("#Mujeres").val(0);
    }
}
function AltaAjax() {
    var type = 'POST';
    var contentType = '';
    var data;
    var dataType;
    var url;
    $.ajax({
        url: url,
        type: type,
        data: dataType,
        success: function () {
        }
    });
}
