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
        function Empleado(nombre, apellido, dni, fNacimiento, sexo, direccion, telefono, estadoCivil, foto, legajo, cuil, ingreso, pais, provincia, egreso, estado) {
            var _this = _super.call(this, nombre, apellido, dni, fNacimiento, sexo, direccion, telefono, estadoCivil, foto) || this;
            _this.cuil = cuil;
            _this.ingreso = ingreso;
            _this.legajo = legajo;
            _this.pais = pais;
            _this.provincia = provincia;
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
    $('#btnEstadisticasCerrar').on('click', function () {
        var sFiltro = $('#sFiltro');
        sFiltro.val($('option:first', sFiltro).val());
        $("#mCantidad").val(0);
        $("#mPromedio").val(0);
        $("#mHombres").val(0);
        $("#mMujeres").val(0);
    });
    CargarDatos();
    SelectPaises();
    SelectPaisesM();
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
    var sexo = String($('input:radio[name=txtSexo]:checked').val());
    var direccion = String($('#txtDireccion').val());
    var telefono = String($('#txtTelefono').val());
    var estadoCivil = String($('input:radio[name=txtEstadoCivil]:checked').val());
    var pais = String($("#txtPais").val());
    var provincia = String($("#txtProvincia").val());
    var foto = imagen;
    var legajo = EstablecerLegajo();
    var cuil = String($('#txtCuil').val());
    var ingreso = String($('#txtIngreso').val());
    var empleado = new proyecto.Empleado(nombre, apellido, dni, fNacimiento, sexo, direccion, telefono, estadoCivil, foto, legajo, cuil, ingreso, pais, provincia);
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
    var pais = String($("#mdPais").val());
    var provincia = String($("#mdProvincia").val());
    var sexo = String($('input:radio[name=mdSexo]:checked').val());
    var estadoCivil = String($('input:radio[name=mdEstadoCivil]:checked').val());
    var cuil = $('#mdCuil').val();
    var ingreso = $('#mdIngreso').val();
    var foto = imagen;
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
            empleados[index].pais = String(pais);
            empleados[index].provincia = String(provincia);
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
            '<div class="form-group"><select id="mdPais" onchange="SelectProvinciasM()"></select></div>' +
            '<div class="form-group"><select id="mdProvincia" onchange=""></select></div>' +
            '<div class="form-group"><input value="' + empleado[0].direccion + '" class="form-control" type="txt" id="mdDireccion" placeholder="Direccion" required/></div>' +
            '<div class="form-group"><input value="' + empleado[0].telefono + '" class="form-control" type="tel" id="mdTelefono" placeholder="Telefono" required/></div>' +
            '<div class="radio"><label><input type="radio" id="mdSexo" name="mdSexo" value="Masculino" checked>Masculino</label></div><div class="radio"><label><input type="radio" id="mdSexo" name="mdSexo" value="Femenino">Femenino</label></div><hr>' +
            '<label for="">Estado Civil</label><div class="radio"><label><input type="radio" id="mdEstadoCivil" name="mdEstadoCivil" value="Soltero" checked>Soltero</label></div><div class="radio"><label><input type="radio" id="mdEstadoCivil" name="mdEstadoCivil" value="Casado">Casado</label></div>' +
            '<div class="form-group"><input value="' + empleado[0].cuil + '" class="form-control" type="text" id="mdCuil" placeholder="Cuil" required/></div>' +
            '<div class="form-group"><label for="mdIngreso">Fecha de Ingreso</label><input value="' + empleado[0].ingreso + '" class="form-control" type="date" id="mdIngreso" required/></div>' +
            '<div><hr><div class="form-group"><label for="mdFoto">Foto</label><input type="file" accept="image/*" name="" id="mdFoto" onchange="TraerImagenM()" required/></div>' +
            '<input class="btn btn-success" type="submit" value="Modificar Empleado"></div></form>';
        $('#modificarBody').html(html);
        SelectPaisesM();
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
        '<div><label>Lugar de Nacimiento:&nbsp</label>' + empleados[0].pais + '&nbsp' + empleados[0].provincia + '</div><br>' +
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
            var empleado = new proyecto.Empleado(empleadosData[index]['nombre'], empleadosData[index]['apellido'], empleadosData[index]['dni'], empleadosData[index]['fNacimiento'], empleadosData[index]['sexo'], empleadosData[index]['direccion'], empleadosData[index]['telefono'], empleadosData[index]['estadoCivil'], empleadosData[index]['foto'], empleadosData[index]['legajo'], empleadosData[index]['cuil'], empleadosData[index]['ingreso'], empleadosData[index]['pais'], empleadosData[index]['provincia'], empleadosData[index]['egreso'], empleadosData[index]['estado']);
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
    var file = $('#txtFoto').prop('files');
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
function TraerImagenM() {
    var file = $('#mdFoto').prop('files');
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
        $("#mHombres").val(0);
        $("#mMujeres").val(0);
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
function TraerPaises() {
    var data = Data();
    var paises = data.map(function (pais) {
        return pais["pais"];
    });
    return paises;
}
function TraerProvincias(pais) {
    var data = Data();
    var prov = data.filter(function (provincia) {
        return provincia["pais"] == pais;
    });
    var provincias = prov.map(function (provincia) {
        return provincia["provincia"];
    });
    return provincias;
}
function SelectPaises() {
    var paises = TraerPaises();
    var html = "";
    for (var index = 0; index < paises.length; index++) {
        html += "<option value=" + paises[index] + ">" + paises[index] + "</option>";
    }
    $("#txtPais").html(html);
}
function SelectPaisesM() {
    var paises = TraerPaises();
    var html = "";
    for (var index = 0; index < paises.length; index++) {
        html += "<option value=" + paises[index] + ">" + paises[index] + "</option>";
    }
    $("#mdPais").html(html);
}
function SelectProvincias() {
    var pais = String($("#txtPais").val());
    var provincias = TraerProvincias(pais);
    var html = "";
    for (var index = 0; index < provincias.length; index++) {
        html += "<option value=" + provincias[index] + ">" + provincias[index] + "</option>";
    }
    $("#txtProvincia").html(html);
}
function SelectProvinciasM() {
    var pais = String($("#mdPais").val());
    var provincias = TraerProvincias(pais);
    var html = "";
    for (var index = 0; index < provincias.length; index++) {
        html += "<option value=" + provincias[index] + ">" + provincias[index] + "</option>";
    }
    $("#mdProvincia").html(html);
}
function Data() {
    var data = [{ "pais": "Czech Republic", "provincia": "Petrov" },
        { "pais": "Cyprus", "provincia": "Nicosia" },
        { "pais": "Indonesia", "provincia": "Pundong" },
        { "pais": "Peru", "provincia": "Aguas Verdes" },
        { "pais": "Sweden", "provincia": "Nykvarn" },
        { "pais": "China", "provincia": "Takeshiken" },
        { "pais": "France", "provincia": "Lyon" },
        { "pais": "Philippines", "provincia": "Buenlag" },
        { "pais": "Russia", "provincia": "Kiyevskoye" },
        { "pais": "Russia", "provincia": "Nizhnevartovsk" },
        { "pais": "New Zealand", "provincia": "Turangi" },
        { "pais": "Poland", "provincia": "Gąbin" },
        { "pais": "Philippines", "provincia": "San Benito" },
        { "pais": "Sweden", "provincia": "Alfta" },
        { "pais": "Indonesia", "provincia": "Dukuhsia" },
        { "pais": "China", "provincia": "Heshi" },
        { "pais": "Namibia", "provincia": "Khorixas" },
        { "pais": "France", "provincia": "Rouen" },
        { "pais": "Russia", "provincia": "Murom" },
        { "pais": "Philippines", "provincia": "Reina Mercedes" },
        { "pais": "China", "provincia": "Shuangkou" },
        { "pais": "Brazil", "provincia": "Goiás" },
        { "pais": "China", "provincia": "Xuanhua" },
        { "pais": "Ethiopia", "provincia": "Mojo" },
        { "pais": "Argentina", "provincia": "Camilo Aldao" },
        { "pais": "Dominican Republic", "provincia": "Sabaneta" },
        { "pais": "Mexico", "provincia": "Isidro Fabela" },
        { "pais": "Indonesia", "provincia": "Puntaru" },
        { "pais": "Russia", "provincia": "Metallostroy" },
        { "pais": "Sweden", "provincia": "Helsingborg" },
        { "pais": "Georgia", "provincia": "Surami" },
        { "pais": "Portugal", "provincia": "Canelas" },
        { "pais": "Norway", "provincia": "Hamar" },
        { "pais": "Macedonia", "provincia": "Pirok" },
        { "pais": "Central African Republic", "provincia": "Mobaye" },
        { "pais": "Indonesia", "provincia": "Wanga" },
        { "pais": "China", "provincia": "Mingyue" },
        { "pais": "Lithuania", "provincia": "Pasvalys" },
        { "pais": "Venezuela", "provincia": "Rubio" },
        { "pais": "China", "provincia": "Dongjiao" },
        { "pais": "China", "provincia": "Huansheng" },
        { "pais": "South Korea", "provincia": "Kunsan" },
        { "pais": "Croatia", "provincia": "Klana" },
        { "pais": "Finland", "provincia": "Lappeenranta" },
        { "pais": "Czech Republic", "provincia": "Raškovice" },
        { "pais": "Argentina", "provincia": "Goya" },
        { "pais": "Russia", "provincia": "Shagonar" },
        { "pais": "Colombia", "provincia": "Popayán" },
        { "pais": "Philippines", "provincia": "Cardona" },
        { "pais": "Iran", "provincia": "Kalāleh" },
        { "pais": "Brazil", "provincia": "José de Freitas" },
        { "pais": "Indonesia", "provincia": "Woro" },
        { "pais": "China", "provincia": "Futang" },
        { "pais": "United States", "provincia": "New Orleans" },
        { "pais": "Peru", "provincia": "Mollepampa" },
        { "pais": "China", "provincia": "Xianglan" },
        { "pais": "Peru", "provincia": "Ichupampa" },
        { "pais": "Armenia", "provincia": "Noyakert" },
        { "pais": "Brazil", "provincia": "Casa Branca" },
        { "pais": "France", "provincia": "Paris 13" },
        { "pais": "China", "provincia": "Longtan" },
        { "pais": "Poland", "provincia": "Chodzież" },
        { "pais": "Philippines", "provincia": "Boljoon" },
        { "pais": "Ukraine", "provincia": "Voloka" },
        { "pais": "China", "provincia": "Fangli" },
        { "pais": "Russia", "provincia": "Primorsko-Akhtarsk" },
        { "pais": "United States", "provincia": "San Francisco" },
        { "pais": "Philippines", "provincia": "Burgos" },
        { "pais": "Thailand", "provincia": "Photharam" },
        { "pais": "Russia", "provincia": "Talovyy" },
        { "pais": "Mexico", "provincia": "Pemex" },
        { "pais": "Serbia", "provincia": "Jermenovci" },
        { "pais": "Czech Republic", "provincia": "Klobuky" },
        { "pais": "Philippines", "provincia": "Tamisan" },
        { "pais": "China", "provincia": "Huangtu" },
        { "pais": "Belarus", "provincia": "Zhlobin" },
        { "pais": "China", "provincia": "Hexing" },
        { "pais": "Poland", "provincia": "Łęknica" },
        { "pais": "Indonesia", "provincia": "Kertosari" },
        { "pais": "Czech Republic", "provincia": "Planá" },
        { "pais": "Tanzania", "provincia": "Lulindi" },
        { "pais": "China", "provincia": "Fubin" },
        { "pais": "Cyprus", "provincia": "Psevdás" },
        { "pais": "Nigeria", "provincia": "Kano" },
        { "pais": "Ukraine", "provincia": "Batiovo" },
        { "pais": "Armenia", "provincia": "Hrazdan" },
        { "pais": "Portugal", "provincia": "Santulhão" },
        { "pais": "Brazil", "provincia": "Auriflama" },
        { "pais": "Peru", "provincia": "Cotabambas" },
        { "pais": "China", "provincia": "Wenfu" },
        { "pais": "France", "provincia": "Nîmes" },
        { "pais": "China", "provincia": "Taodian" },
        { "pais": "Philippines", "provincia": "Tinambacan" },
        { "pais": "Canada", "provincia": "Mirabel" },
        { "pais": "Iran", "provincia": "Eqbālīyeh" },
        { "pais": "Poland", "provincia": "Koniaków" },
        { "pais": "China", "provincia": "Hezhai" },
        { "pais": "China", "provincia": "Songgai" },
        { "pais": "Syria", "provincia": "Tall Rif‘at" },
        { "pais": "Saudi Arabia", "provincia": "Najrān" },
        { "pais": "Mongolia", "provincia": "Bayan-Ovoo" },
        { "pais": "Indonesia", "provincia": "Balangpule" },
        { "pais": "Indonesia", "provincia": "Detusoko" },
        { "pais": "Republic of the Congo", "provincia": "Djambala" },
        { "pais": "Poland", "provincia": "Polanica-Zdrój" },
        { "pais": "Brazil", "provincia": "Paranapanema" },
        { "pais": "Brazil", "provincia": "Natal" },
        { "pais": "Philippines", "provincia": "Imus" },
        { "pais": "Greece", "provincia": "Deskáti" },
        { "pais": "Poland", "provincia": "Iwkowa" },
        { "pais": "Honduras", "provincia": "Puerto Castilla" },
        { "pais": "Peru", "provincia": "Carumas" },
        { "pais": "China", "provincia": "Xinxu" },
        { "pais": "Philippines", "provincia": "Tambo" },
        { "pais": "Saint Lucia", "provincia": "Castries" },
        { "pais": "China", "provincia": "Zijin" },
        { "pais": "Sri Lanka", "provincia": "Ampara" },
        { "pais": "China", "provincia": "Baoshan" },
        { "pais": "Philippines", "provincia": "Casisang" },
        { "pais": "Russia", "provincia": "Verkhnyaya Khava" },
        { "pais": "Thailand", "provincia": "Dan Khun Thot" },
        { "pais": "Russia", "provincia": "Kikerino" },
        { "pais": "Cuba", "provincia": "Río Guayabal de Yateras" },
        { "pais": "China", "provincia": "Tangdong" },
        { "pais": "China", "provincia": "Ketang" },
        { "pais": "China", "provincia": "Kuanghe" },
        { "pais": "Japan", "provincia": "Aso" },
        { "pais": "China", "provincia": "Henghe" },
        { "pais": "Finland", "provincia": "Virolahti" },
        { "pais": "United States", "provincia": "Atlanta" },
        { "pais": "Poland", "provincia": "Cielądz" },
        { "pais": "Malta", "provincia": "Saint Lucia" },
        { "pais": "China", "provincia": "Ziketan" },
        { "pais": "Brazil", "provincia": "Itaparica" },
        { "pais": "Russia", "provincia": "Sovetskiy" },
        { "pais": "Sri Lanka", "provincia": "Hikkaduwa" },
        { "pais": "China", "provincia": "Nanshi" },
        { "pais": "Canada", "provincia": "Lumsden" },
        { "pais": "Nigeria", "provincia": "Katsina" },
        { "pais": "Czech Republic", "provincia": "Šestajovice" },
        { "pais": "China", "provincia": "Tongshan" },
        { "pais": "Indonesia", "provincia": "Bitung" },
        { "pais": "Czech Republic", "provincia": "Rokytnice nad Jizerou" },
        { "pais": "China", "provincia": "Dongshan" },
        { "pais": "Italy", "provincia": "Verona" },
        { "pais": "Indonesia", "provincia": "Curug" },
        { "pais": "France", "provincia": "Rungis" },
        { "pais": "Honduras", "provincia": "Quebradas" },
        { "pais": "China", "provincia": "Jiaoziya" },
        { "pais": "China", "provincia": "Shimen" },
        { "pais": "Costa Rica", "provincia": "Ángeles" },
        { "pais": "Philippines", "provincia": "Santo Niño" },
        { "pais": "France", "provincia": "Paris 03" },
        { "pais": "China", "provincia": "Shuiyuan" },
        { "pais": "Tanzania", "provincia": "Makungu" },
        { "pais": "Argentina", "provincia": "Cerro Corá" },
        { "pais": "Cyprus", "provincia": "Émpa" },
        { "pais": "Indonesia", "provincia": "Lilin Satu" },
        { "pais": "Brazil", "provincia": "Caieiras" },
        { "pais": "China", "provincia": "Wenshao" },
        { "pais": "Russia", "provincia": "Gornorechenskiy" },
        { "pais": "Indonesia", "provincia": "Oefatu" },
        { "pais": "China", "provincia": "Xianzong" },
        { "pais": "United States", "provincia": "Nashville" },
        { "pais": "Japan", "provincia": "Yoichi" },
        { "pais": "Indonesia", "provincia": "Kertabumi" },
        { "pais": "Kazakhstan", "provincia": "Zhabagly" },
        { "pais": "France", "provincia": "Toulouse" },
        { "pais": "Albania", "provincia": "Valbonë" },
        { "pais": "Thailand", "provincia": "Phuket" },
        { "pais": "Albania", "provincia": "Ishëm" },
        { "pais": "Palestinian Territory", "provincia": "Bardalah" },
        { "pais": "China", "provincia": "Hualong" },
        { "pais": "Russia", "provincia": "Chernigovka" },
        { "pais": "Serbia", "provincia": "Tomaševac" },
        { "pais": "China", "provincia": "Aqqan" },
        { "pais": "Nigeria", "provincia": "Lafiagi" },
        { "pais": "Italy", "provincia": "Napoli" },
        { "pais": "Colombia", "provincia": "Elías" },
        { "pais": "Afghanistan", "provincia": "Muḩammad Āghah Wuluswālī" },
        { "pais": "Philippines", "provincia": "Bayombong" },
        { "pais": "Ireland", "provincia": "Kanturk" },
        { "pais": "France", "provincia": "Ancenis" },
        { "pais": "Greece", "provincia": "Spétses" },
        { "pais": "Poland", "provincia": "Nowy Dwór Mazowiecki" },
        { "pais": "Argentina", "provincia": "Cachí" },
        { "pais": "Tanzania", "provincia": "Kihurio" },
        { "pais": "Indonesia", "provincia": "Roioen" },
        { "pais": "Philippines", "provincia": "Banocboc" },
        { "pais": "Russia", "provincia": "Adygeysk" },
        { "pais": "China", "provincia": "Nandu" },
        { "pais": "China", "provincia": "Zhapu" },
        { "pais": "Indonesia", "provincia": "Desa Werasari" },
        { "pais": "Afghanistan", "provincia": "Jabal os Saraj" },
        { "pais": "Poland", "provincia": "Rzeszów" },
        { "pais": "China", "provincia": "Quchi" },
        { "pais": "Brazil", "provincia": "Vargem Grande" },
        { "pais": "China", "provincia": "Kuilehe" },
        { "pais": "Chile", "provincia": "Iquique" },
        { "pais": "Greece", "provincia": "Kalpáki" },
        { "pais": "Indonesia", "provincia": "Urung" },
        { "pais": "Russia", "provincia": "Zmiyëvka" },
        { "pais": "Poland", "provincia": "Niechanowo" },
        { "pais": "Albania", "provincia": "Konispol" },
        { "pais": "Greece", "provincia": "Chrysó" },
        { "pais": "China", "provincia": "Yangtan" },
        { "pais": "Belarus", "provincia": "Blon’" },
        { "pais": "Brazil", "provincia": "Jaguaribe" },
        { "pais": "Russia", "provincia": "Krylovskaya" },
        { "pais": "Indonesia", "provincia": "Sukamaju" },
        { "pais": "Indonesia", "provincia": "Ambarita" },
        { "pais": "Sweden", "provincia": "Valdemarsvik" },
        { "pais": "Mali", "provincia": "Ténenkou" },
        { "pais": "Czech Republic", "provincia": "Kovářov" },
        { "pais": "Ivory Coast", "provincia": "Gagnoa" },
        { "pais": "Morocco", "provincia": "El Hajeb" },
        { "pais": "China", "provincia": "Taishang" },
        { "pais": "Venezuela", "provincia": "Cabimas" },
        { "pais": "Philippines", "provincia": "Dapdap" },
        { "pais": "Portugal", "provincia": "Odrinhas" },
        { "pais": "Indonesia", "provincia": "Magetlegar" },
        { "pais": "Czech Republic", "provincia": "Bouzov" },
        { "pais": "Poland", "provincia": "Olesno" },
        { "pais": "Turkey", "provincia": "Yeniköy" },
        { "pais": "Philippines", "provincia": "Maagnas" },
        { "pais": "United States", "provincia": "Dallas" },
        { "pais": "China", "provincia": "Jianlong" },
        { "pais": "Iran", "provincia": "Sari" },
        { "pais": "Ukraine", "provincia": "Vasyshcheve" },
        { "pais": "Greece", "provincia": "Kolchikón" },
        { "pais": "Afghanistan", "provincia": "Markaz-e Ḩukūmat-e Darwēshān" },
        { "pais": "Nigeria", "provincia": "Igbor" },
        { "pais": "China", "provincia": "Yuyao" },
        { "pais": "Canada", "provincia": "Princeton" },
        { "pais": "China", "provincia": "Yirshi" },
        { "pais": "Ecuador", "provincia": "Atuntaqui" },
        { "pais": "France", "provincia": "Oullins" },
        { "pais": "United Kingdom", "provincia": "Sheffield" },
        { "pais": "Colombia", "provincia": "Lérida" },
        { "pais": "Poland", "provincia": "Ochota" },
        { "pais": "Poland", "provincia": "Orzesze" },
        { "pais": "Philippines", "provincia": "Carriedo" },
        { "pais": "Ivory Coast", "provincia": "Mankono" },
        { "pais": "Bangladesh", "provincia": "Khulna" },
        { "pais": "Luxembourg", "provincia": "Schifflange" },
        { "pais": "China", "provincia": "Yulin" },
        { "pais": "Guatemala", "provincia": "Soloma" },
        { "pais": "United States", "provincia": "Lubbock" },
        { "pais": "Russia", "provincia": "Divnoye" },
        { "pais": "Albania", "provincia": "Blerim" },
        { "pais": "Japan", "provincia": "Suibara" },
        { "pais": "China", "provincia": "Heping" },
        { "pais": "Indonesia", "provincia": "Waenenda" },
        { "pais": "China", "provincia": "Huangmao" },
        { "pais": "South Korea", "provincia": "Hwaseong-si" },
        { "pais": "Croatia", "provincia": "Ernestinovo" },
        { "pais": "Poland", "provincia": "Wojciechów" },
        { "pais": "China", "provincia": "Lishui" },
        { "pais": "Japan", "provincia": "Tokyo" },
        { "pais": "Ukraine", "provincia": "Dmytrivka" },
        { "pais": "Nicaragua", "provincia": "Siuna" },
        { "pais": "China", "provincia": "Licheng" },
        { "pais": "China", "provincia": "Xiangxiang" },
        { "pais": "Philippines", "provincia": "Labrador" },
        { "pais": "Indonesia", "provincia": "Mersam" },
        { "pais": "Russia", "provincia": "Kyra" },
        { "pais": "Hungary", "provincia": "Budapest" },
        { "pais": "Panama", "provincia": "La Peña" },
        { "pais": "Pakistan", "provincia": "Islāmkot" },
        { "pais": "China", "provincia": "Chengbei" },
        { "pais": "Colombia", "provincia": "San Diego" },
        { "pais": "Azerbaijan", "provincia": "Qobustan" },
        { "pais": "Philippines", "provincia": "Bayang" },
        { "pais": "Afghanistan", "provincia": "Nīkêh" },
        { "pais": "China", "provincia": "Liangshui" },
        { "pais": "Indonesia", "provincia": "Lendan" },
        { "pais": "United States", "provincia": "Jeffersonville" },
        { "pais": "United States", "provincia": "Pompano Beach" },
        { "pais": "China", "provincia": "Dananyu" },
        { "pais": "China", "provincia": "Huaidian" },
        { "pais": "China", "provincia": "Pu’er" },
        { "pais": "China", "provincia": "Xikou" },
        { "pais": "China", "provincia": "Shaoguan" },
        { "pais": "United States", "provincia": "Wilkes Barre" },
        { "pais": "Tanzania", "provincia": "Tandahimba" },
        { "pais": "Thailand", "provincia": "Non Sung" },
        { "pais": "Argentina", "provincia": "Las Heras" },
        { "pais": "Russia", "provincia": "Kafyr-Kumukh" },
        { "pais": "Sudan", "provincia": "Geneina" },
        { "pais": "Lithuania", "provincia": "Radviliskis" },
        { "pais": "China", "provincia": "Wenping" },
        { "pais": "Albania", "provincia": "Fratar" },
        { "pais": "Malaysia", "provincia": "Pulau Pinang" },
        { "pais": "Colombia", "provincia": "Guachetá" },
        { "pais": "Indonesia", "provincia": "Batur Kidul" },
        { "pais": "Argentina", "provincia": "Jesús María" },
        { "pais": "Brazil", "provincia": "Ribeirão Pires" },
        { "pais": "China", "provincia": "Mayanhe" },
        { "pais": "Israel", "provincia": "Dimona" },
        { "pais": "Indonesia", "provincia": "Bantal" },
        { "pais": "China", "provincia": "Daohe" },
        { "pais": "France", "provincia": "Toulouse" },
        { "pais": "China", "provincia": "Huancheng" },
        { "pais": "Indonesia", "provincia": "Bajo" },
        { "pais": "Japan", "provincia": "Nagasaki-shi" },
        { "pais": "Thailand", "provincia": "Kaeng Khoi" },
        { "pais": "Indonesia", "provincia": "Lawepakam" },
        { "pais": "Brazil", "provincia": "Lago dos Rodrigues" },
        { "pais": "Russia", "provincia": "Soldato-Aleksandrovskoye" },
        { "pais": "South Africa", "provincia": "Louis Trichardt" },
        { "pais": "Brazil", "provincia": "Russas" },
        { "pais": "Japan", "provincia": "Gifu-shi" },
        { "pais": "China", "provincia": "Xinyan" },
        { "pais": "Netherlands", "provincia": "Leeuwarden" },
        { "pais": "Argentina", "provincia": "Zapala" },
        { "pais": "Pakistan", "provincia": "Kunjāh" },
        { "pais": "China", "provincia": "Huoxian" },
        { "pais": "Greece", "provincia": "Dióni" },
        { "pais": "China", "provincia": "Zhaotong" },
        { "pais": "China", "provincia": "Liugou" },
        { "pais": "Philippines", "provincia": "Burgos" },
        { "pais": "Jordan", "provincia": "Russeifa" },
        { "pais": "Latvia", "provincia": "Viesīte" },
        { "pais": "Portugal", "provincia": "Pontes" },
        { "pais": "China", "provincia": "Shaba Zhen" },
        { "pais": "Peru", "provincia": "Huangascar" },
        { "pais": "Philippines", "provincia": "Tayug" },
        { "pais": "China", "provincia": "Beizi" },
        { "pais": "Philippines", "provincia": "Pantubig" },
        { "pais": "Thailand", "provincia": "Lop Buri" },
        { "pais": "Dominican Republic", "provincia": "Salsipuedes" },
        { "pais": "Ukraine", "provincia": "Sheshory" },
        { "pais": "Sri Lanka", "provincia": "Valvedditturai" },
        { "pais": "China", "provincia": "Lingtou" },
        { "pais": "Greece", "provincia": "Antíparos" },
        { "pais": "Portugal", "provincia": "Marinha" },
        { "pais": "Philippines", "provincia": "Tagoloan" },
        { "pais": "Albania", "provincia": "Selenicë" },
        { "pais": "Nigeria", "provincia": "Wukari" },
        { "pais": "Philippines", "provincia": "Sandayong Sur" },
        { "pais": "Zambia", "provincia": "Sinazongwe" },
        { "pais": "China", "provincia": "Fengyan" },
        { "pais": "China", "provincia": "Haoguantun" },
        { "pais": "China", "provincia": "Chongmin" },
        { "pais": "South Korea", "provincia": "Songhae" },
        { "pais": "Sweden", "provincia": "Charlottenberg" },
        { "pais": "China", "provincia": "Raoyang" },
        { "pais": "Indonesia", "provincia": "Kiruru" },
        { "pais": "Madagascar", "provincia": "Ambato Boeny" },
        { "pais": "Afghanistan", "provincia": "Khōshāmand" },
        { "pais": "Mexico", "provincia": "La Esperanza" },
        { "pais": "Indonesia", "provincia": "Oebai" },
        { "pais": "Brazil", "provincia": "Aquidauana" },
        { "pais": "Colombia", "provincia": "San Carlos" },
        { "pais": "China", "provincia": "Weiting" },
        { "pais": "Russia", "provincia": "Mamedkala" },
        { "pais": "Albania", "provincia": "Mamurras" },
        { "pais": "Indonesia", "provincia": "Banjar Madangan Kaja" },
        { "pais": "Sweden", "provincia": "Årjäng" },
        { "pais": "Indonesia", "provincia": "Nangela" },
        { "pais": "China", "provincia": "Hanlin" },
        { "pais": "China", "provincia": "Xingyuan" },
        { "pais": "Yemen", "provincia": "At Tawāhī" },
        { "pais": "Mexico", "provincia": "Reforma" },
        { "pais": "China", "provincia": "Zougang" },
        { "pais": "Peru", "provincia": "Chumpi" },
        { "pais": "Brazil", "provincia": "Tapiramutá" },
        { "pais": "China", "provincia": "Zhongben" },
        { "pais": "Czech Republic", "provincia": "Březová nad Svitavou" },
        { "pais": "Japan", "provincia": "Yamagata-shi" },
        { "pais": "France", "provincia": "Saint-Fargeau-Ponthierry" },
        { "pais": "Poland", "provincia": "Krzyżanowice" },
        { "pais": "China", "provincia": "Yantian" },
        { "pais": "Argentina", "provincia": "Hernando" },
        { "pais": "Colombia", "provincia": "Fosca" },
        { "pais": "Sweden", "provincia": "Stockholm" },
        { "pais": "Portugal", "provincia": "Paraíso" },
        { "pais": "Nigeria", "provincia": "Lame" },
        { "pais": "South Africa", "provincia": "Hluhluwe" },
        { "pais": "Japan", "provincia": "Togitsu" },
        { "pais": "Nigeria", "provincia": "Ipoti" },
        { "pais": "Argentina", "provincia": "Cruz del Eje" },
        { "pais": "Morocco", "provincia": "Ghouazi" },
        { "pais": "New Zealand", "provincia": "Pukekohe East" },
        { "pais": "Brazil", "provincia": "São Sepé" },
        { "pais": "Colombia", "provincia": "Linares" },
        { "pais": "Thailand", "provincia": "Bang Rak" },
        { "pais": "Tanzania", "provincia": "Old Shinyanga" },
        { "pais": "Indonesia", "provincia": "Gemuruh" },
        { "pais": "China", "provincia": "Xinfu" },
        { "pais": "Indonesia", "provincia": "Babakankiray" },
        { "pais": "Germany", "provincia": "Braunschweig" },
        { "pais": "Portugal", "provincia": "Baleal" },
        { "pais": "Sri Lanka", "provincia": "Kalutara" },
        { "pais": "Croatia", "provincia": "Baška Voda" },
        { "pais": "Honduras", "provincia": "La Sabana" },
        { "pais": "Chile", "provincia": "Chonchi" },
        { "pais": "Portugal", "provincia": "Tarouca" },
        { "pais": "China", "provincia": "Jiguan" },
        { "pais": "Russia", "provincia": "Saskylakh" },
        { "pais": "Mexico", "provincia": "Santa Maria" },
        { "pais": "China", "provincia": "Tianchi" },
        { "pais": "China", "provincia": "Quyangqiao" },
        { "pais": "Syria", "provincia": "At Tibnī" },
        { "pais": "Thailand", "provincia": "Non Sila" },
        { "pais": "China", "provincia": "Qingxi" },
        { "pais": "France", "provincia": "Rungis" },
        { "pais": "Indonesia", "provincia": "Babakan" },
        { "pais": "Venezuela", "provincia": "Veguitas" },
        { "pais": "Russia", "provincia": "Lebedyan’" },
        { "pais": "Dominican Republic", "provincia": "Las Matas de Farfán" },
        { "pais": "France", "provincia": "Arbois" },
        { "pais": "Poland", "provincia": "Milanówek" },
        { "pais": "Brazil", "provincia": "Mandaguari" },
        { "pais": "Poland", "provincia": "Krosno" },
        { "pais": "Brazil", "provincia": "São José dos Pinhais" },
        { "pais": "Portugal", "provincia": "Alcorriol" },
        { "pais": "Russia", "provincia": "Krasnaya Polyana" },
        { "pais": "China", "provincia": "Changleng" },
        { "pais": "Indonesia", "provincia": "Cipicung Timur" },
        { "pais": "Czech Republic", "provincia": "Žitenice" },
        { "pais": "Morocco", "provincia": "El Hajeb" },
        { "pais": "Israel", "provincia": "Bené Beraq" },
        { "pais": "Portugal", "provincia": "Estrada" },
        { "pais": "Russia", "provincia": "Povorino" },
        { "pais": "Thailand", "provincia": "Dusit" },
        { "pais": "United States", "provincia": "Los Angeles" },
        { "pais": "Indonesia", "provincia": "Montongtebolak" },
        { "pais": "United States", "provincia": "Denver" },
        { "pais": "El Salvador", "provincia": "Santa Ana" },
        { "pais": "Indonesia", "provincia": "Sukomulyo" },
        { "pais": "Indonesia", "provincia": "Jagong" },
        { "pais": "Armenia", "provincia": "Shenavan" },
        { "pais": "Indonesia", "provincia": "Tetebatu" },
        { "pais": "Russia", "provincia": "Rassvet" },
        { "pais": "Indonesia", "provincia": "Tumu" },
        { "pais": "Poland", "provincia": "Wróblew" },
        { "pais": "Brazil", "provincia": "Ibaté" },
        { "pais": "Ireland", "provincia": "Enniskerry" },
        { "pais": "Indonesia", "provincia": "Fatufaun" },
        { "pais": "Indonesia", "provincia": "Jurak Lao’" },
        { "pais": "Nigeria", "provincia": "Rabah" },
        { "pais": "Germany", "provincia": "Augsburg" },
        { "pais": "Luxembourg", "provincia": "Redange-sur-Attert" },
        { "pais": "Colombia", "provincia": "Puerto Colombia" },
        { "pais": "China", "provincia": "Pingqiao" },
        { "pais": "United States", "provincia": "El Paso" },
        { "pais": "Poland", "provincia": "Suchy Las" },
        { "pais": "Peru", "provincia": "Maca" },
        { "pais": "Japan", "provincia": "Hamamatsu" },
        { "pais": "Dominican Republic", "provincia": "Río Grande" },
        { "pais": "Peru", "provincia": "Casma" },
        { "pais": "Japan", "provincia": "Kuroiso" },
        { "pais": "Sweden", "provincia": "Huskvarna" },
        { "pais": "Micronesia", "provincia": "Faraulep" },
        { "pais": "Indonesia", "provincia": "Simpang Ulim" },
        { "pais": "China", "provincia": "Changping" },
        { "pais": "China", "provincia": "Dananshan" },
        { "pais": "Iran", "provincia": "Tākestān" },
        { "pais": "China", "provincia": "Longtou’an" },
        { "pais": "Slovenia", "provincia": "Bistrica ob Sotli" },
        { "pais": "Indonesia", "provincia": "Selorejo" },
        { "pais": "Indonesia", "provincia": "Cikabuyutan Barat" },
        { "pais": "Brazil", "provincia": "Rio Grande da Serra" },
        { "pais": "Slovenia", "provincia": "Zgornje Pirniče" },
        { "pais": "China", "provincia": "Zhapu" },
        { "pais": "China", "provincia": "Qitai" },
        { "pais": "Czech Republic", "provincia": "Radnice" },
        { "pais": "Mongolia", "provincia": "Hashaat" },
        { "pais": "Poland", "provincia": "Bralin" },
        { "pais": "Burundi", "provincia": "Bubanza" },
        { "pais": "Afghanistan", "provincia": "Jawand" },
        { "pais": "Peru", "provincia": "Máncora" },
        { "pais": "France", "provincia": "Lunéville" },
        { "pais": "Czech Republic", "provincia": "Lysá nad Labem" },
        { "pais": "Philippines", "provincia": "Tipaz" },
        { "pais": "Philippines", "provincia": "Dicamay" },
        { "pais": "Uganda", "provincia": "Nakasongola" },
        { "pais": "Russia", "provincia": "Kamenskiy" },
        { "pais": "Brazil", "provincia": "Igarapé" },
        { "pais": "Spain", "provincia": "Valencia" },
        { "pais": "Philippines", "provincia": "Ani-e" },
        { "pais": "Georgia", "provincia": "Qvareli" },
        { "pais": "Montserrat", "provincia": "Brades" },
        { "pais": "South Africa", "provincia": "Delmas" },
        { "pais": "Sweden", "provincia": "Karlstad" },
        { "pais": "Uruguay", "provincia": "Vergara" },
        { "pais": "Yemen", "provincia": "Jiḩānah" },
        { "pais": "Portugal", "provincia": "Arcena" },
        { "pais": "China", "provincia": "Xiangying" },
        { "pais": "South Korea", "provincia": "Suwon-si" },
        { "pais": "United States", "provincia": "Houston" },
        { "pais": "Colombia", "provincia": "La Virginia" },
        { "pais": "Portugal", "provincia": "Real" },
        { "pais": "Portugal", "provincia": "Fonte da Aldeia" },
        { "pais": "Sweden", "provincia": "Stockholm" },
        { "pais": "Tanzania", "provincia": "Bugarama" },
        { "pais": "Russia", "provincia": "Krasnyye Barrikady" },
        { "pais": "Ukraine", "provincia": "Krasnosilka" },
        { "pais": "Ukraine", "provincia": "Rozhnyativ" },
        { "pais": "Mexico", "provincia": "El Progreso" },
        { "pais": "Morocco", "provincia": "Tizguine" },
        { "pais": "China", "provincia": "Xiaocheng" },
        { "pais": "China", "provincia": "Cheqiao" },
        { "pais": "Indonesia", "provincia": "Buriwutung" },
        { "pais": "Honduras", "provincia": "Valle de Ángeles" },
        { "pais": "Mexico", "provincia": "Manlio Fabio Altamirano" },
        { "pais": "Brazil", "provincia": "Presidente Prudente" },
        { "pais": "China", "provincia": "Gulai" },
        { "pais": "Ukraine", "provincia": "Petropavlivka" },
        { "pais": "Argentina", "provincia": "Chavarría" },
        { "pais": "China", "provincia": "Jingmao" },
        { "pais": "Nigeria", "provincia": "Dutsin Ma" },
        { "pais": "Philippines", "provincia": "Binubusan" },
        { "pais": "Bosnia and Herzegovina", "provincia": "Hotonj" },
        { "pais": "United States", "provincia": "Phoenix" },
        { "pais": "Netherlands", "provincia": "Leiden" },
        { "pais": "Albania", "provincia": "Progër" },
        { "pais": "Tanzania", "provincia": "Kisesa" },
        { "pais": "Greece", "provincia": "Léchovo" },
        { "pais": "Poland", "provincia": "Malec" },
        { "pais": "Poland", "provincia": "Wilczyce" },
        { "pais": "Portugal", "provincia": "Colmeal" },
        { "pais": "China", "provincia": "Hongdu" },
        { "pais": "China", "provincia": "Gaide" },
        { "pais": "China", "provincia": "Hongqi" },
        { "pais": "Chile", "provincia": "Lota" },
        { "pais": "Russia", "provincia": "Yermish’" },
        { "pais": "Ukraine", "provincia": "Kalanchak" },
        { "pais": "Chile", "provincia": "Lampa" },
        { "pais": "Indonesia", "provincia": "Darunban" },
        { "pais": "China", "provincia": "Xiongchi" },
        { "pais": "Sweden", "provincia": "Jönköping" },
        { "pais": "Czech Republic", "provincia": "Město Albrechtice" },
        { "pais": "China", "provincia": "Tanshan" },
        { "pais": "Russia", "provincia": "Gudermes" },
        { "pais": "Macedonia", "provincia": "Kumanovo" },
        { "pais": "China", "provincia": "Shucheng Chengguanzhen" },
        { "pais": "Brazil", "provincia": "Vassouras" },
        { "pais": "Armenia", "provincia": "Fantan" },
        { "pais": "Indonesia", "provincia": "Pinggan" },
        { "pais": "Philippines", "provincia": "Pitogo" },
        { "pais": "Poland", "provincia": "Moryń" },
        { "pais": "China", "provincia": "Fengyi" },
        { "pais": "Sweden", "provincia": "Stockholm" },
        { "pais": "Greece", "provincia": "Perístasi" },
        { "pais": "Russia", "provincia": "Sovetsk" },
        { "pais": "China", "provincia": "Luci" },
        { "pais": "Philippines", "provincia": "Balogo" },
        { "pais": "Philippines", "provincia": "San Vicente" },
        { "pais": "China", "provincia": "Wenxi" },
        { "pais": "Yemen", "provincia": "Mayfa‘ah" },
        { "pais": "Indonesia", "provincia": "Sidomakmur" },
        { "pais": "China", "provincia": "Taixi" },
        { "pais": "Brazil", "provincia": "Jaboatão" },
        { "pais": "Indonesia", "provincia": "Manding" },
        { "pais": "Martinique", "provincia": "Fort-de-France" },
        { "pais": "Brazil", "provincia": "Schroeder" },
        { "pais": "Portugal", "provincia": "Maceda" },
        { "pais": "Russia", "provincia": "Shumikhinskiy" },
        { "pais": "Vietnam", "provincia": "Tân Sơn" },
        { "pais": "Netherlands", "provincia": "Venlo" },
        { "pais": "China", "provincia": "Fushan" },
        { "pais": "Poland", "provincia": "Bojadła" },
        { "pais": "Croatia", "provincia": "Marija Bistrica" },
        { "pais": "Colombia", "provincia": "Elías" },
        { "pais": "Brazil", "provincia": "Orlândia" },
        { "pais": "Samoa", "provincia": "Safotulafai" },
        { "pais": "Afghanistan", "provincia": "Baghlān" },
        { "pais": "Canada", "provincia": "Saint-André-Avellin" },
        { "pais": "Indonesia", "provincia": "Mukun" },
        { "pais": "Sweden", "provincia": "Danderyd" },
        { "pais": "Tunisia", "provincia": "Tunis" },
        { "pais": "Indonesia", "provincia": "Leramatang" },
        { "pais": "Portugal", "provincia": "Pardelhas" },
        { "pais": "Indonesia", "provincia": "Puncaksempur" },
        { "pais": "Georgia", "provincia": "Khashuri" },
        { "pais": "Brazil", "provincia": "Marialva" },
        { "pais": "Sweden", "provincia": "Nybro" },
        { "pais": "Ukraine", "provincia": "Lebedyn" },
        { "pais": "Norway", "provincia": "Oslo" },
        { "pais": "Colombia", "provincia": "Ríohacha" },
        { "pais": "Cuba", "provincia": "Cienfuegos" },
        { "pais": "China", "provincia": "Jiancha" },
        { "pais": "France", "provincia": "Mulhouse" },
        { "pais": "Czech Republic", "provincia": "Hostomice" },
        { "pais": "China", "provincia": "Yaosai" },
        { "pais": "South Africa", "provincia": "Volksrust" },
        { "pais": "Sweden", "provincia": "Mörrum" },
        { "pais": "China", "provincia": "Mawu" },
        { "pais": "China", "provincia": "Xilanqi" },
        { "pais": "Russia", "provincia": "Pestovo" },
        { "pais": "Russia", "provincia": "Tuapse" },
        { "pais": "Indonesia", "provincia": "Telagaselaba" },
        { "pais": "Russia", "provincia": "Atamanovka" },
        { "pais": "China", "provincia": "Wenquan" },
        { "pais": "New Zealand", "provincia": "Timaru" },
        { "pais": "Indonesia", "provincia": "Panyingkiran" },
        { "pais": "France", "provincia": "Toulon" },
        { "pais": "Venezuela", "provincia": "Ciudad Bolivia" },
        { "pais": "France", "provincia": "Marseille" },
        { "pais": "China", "provincia": "Xuefu" },
        { "pais": "Georgia", "provincia": "Agara" },
        { "pais": "Japan", "provincia": "Shiki" },
        { "pais": "China", "provincia": "Honghai" },
        { "pais": "China", "provincia": "Xigaoshan" },
        { "pais": "Sweden", "provincia": "Solna" },
        { "pais": "Indonesia", "provincia": "Cimanggu" },
        { "pais": "China", "provincia": "Hongxing" },
        { "pais": "Indonesia", "provincia": "Ciduren" },
        { "pais": "South Sudan", "provincia": "Raga" },
        { "pais": "Mexico", "provincia": "La Reforma" },
        { "pais": "Poland", "provincia": "Przewóz" },
        { "pais": "Afghanistan", "provincia": "Ārt Khwājah" },
        { "pais": "China", "provincia": "Yangwei" },
        { "pais": "Colombia", "provincia": "Guamal" },
        { "pais": "Brazil", "provincia": "Jequié" },
        { "pais": "China", "provincia": "Yidu" },
        { "pais": "United States", "provincia": "Oklahoma City" },
        { "pais": "Colombia", "provincia": "La Tebaida" },
        { "pais": "Indonesia", "provincia": "Pasirbitung" },
        { "pais": "Brazil", "provincia": "Conde" },
        { "pais": "Indonesia", "provincia": "Banjar Susut Kaja" },
        { "pais": "Zambia", "provincia": "Kataba" },
        { "pais": "Azerbaijan", "provincia": "Yuxarı Aran" },
        { "pais": "Thailand", "provincia": "Phimai" },
        { "pais": "Indonesia", "provincia": "Sudimara" },
        { "pais": "Thailand", "provincia": "Ko Chan" },
        { "pais": "Brazil", "provincia": "Bastos" },
        { "pais": "Portugal", "provincia": "Ponta Delgada" },
        { "pais": "United States", "provincia": "Las Vegas" },
        { "pais": "Portugal", "provincia": "Monte Agudo" },
        { "pais": "Colombia", "provincia": "Villavicencio" },
        { "pais": "Sweden", "provincia": "Sundbyberg" },
        { "pais": "Indonesia", "provincia": "Bumirejo" },
        { "pais": "Philippines", "provincia": "Zaragoza" },
        { "pais": "United States", "provincia": "Albany" },
        { "pais": "United States", "provincia": "Springfield" },
        { "pais": "Serbia", "provincia": "Tomaševac" },
        { "pais": "Indonesia", "provincia": "Litibakul" },
        { "pais": "Russia", "provincia": "Yeysk" },
        { "pais": "Greece", "provincia": "Megalópoli" },
        { "pais": "Brazil", "provincia": "Iraquara" },
        { "pais": "Nicaragua", "provincia": "Jalapa" },
        { "pais": "Sudan", "provincia": "Umm Ruwaba" },
        { "pais": "Philippines", "provincia": "Maduao" },
        { "pais": "Finland", "provincia": "Hollola" },
        { "pais": "Papua New Guinea", "provincia": "Lorengau" },
        { "pais": "China", "provincia": "Xinghe Chengguanzhen" },
        { "pais": "Indonesia", "provincia": "Legok" },
        { "pais": "Brazil", "provincia": "Caçapava do Sul" },
        { "pais": "Sweden", "provincia": "Södertälje" },
        { "pais": "Brazil", "provincia": "Poconé" },
        { "pais": "Indonesia", "provincia": "Cilegong" },
        { "pais": "China", "provincia": "Shahezi" },
        { "pais": "Indonesia", "provincia": "Bojong" },
        { "pais": "Czech Republic", "provincia": "Zliv" },
        { "pais": "Syria", "provincia": "As Suqaylibīyah" },
        { "pais": "Czech Republic", "provincia": "Planá" },
        { "pais": "Poland", "provincia": "Rybnik" },
        { "pais": "Poland", "provincia": "Skulsk" },
        { "pais": "Argentina", "provincia": "Pocito" },
        { "pais": "Russia", "provincia": "Shakhty" },
        { "pais": "China", "provincia": "Mocun" },
        { "pais": "Sweden", "provincia": "Västerås" },
        { "pais": "China", "provincia": "Tongquan" },
        { "pais": "Thailand", "provincia": "Ban Muang" },
        { "pais": "Russia", "provincia": "Belomorsk" },
        { "pais": "Indonesia", "provincia": "Mulawato" },
        { "pais": "Haiti", "provincia": "Jeremi" },
        { "pais": "Indonesia", "provincia": "Duwe" },
        { "pais": "Yemen", "provincia": "Ţawr al Bāḩah" },
        { "pais": "China", "provincia": "Gangkou" },
        { "pais": "Macedonia", "provincia": "Negotino" },
        { "pais": "Philippines", "provincia": "Sindangan" },
        { "pais": "Finland", "provincia": "Nurmijärvi" },
        { "pais": "Brazil", "provincia": "Indaial" },
        { "pais": "Russia", "provincia": "Sasykoli" },
        { "pais": "Indonesia", "provincia": "Jedung" },
        { "pais": "Syria", "provincia": "Muḩradah" },
        { "pais": "Peru", "provincia": "Chucatamani" },
        { "pais": "Egypt", "provincia": "Siwa Oasis" },
        { "pais": "China", "provincia": "Shuangtang" },
        { "pais": "Indonesia", "provincia": "Indralayang" },
        { "pais": "Palestinian Territory", "provincia": "Zubūbah" },
        { "pais": "France", "provincia": "Saintes" },
        { "pais": "Morocco", "provincia": "Sidi Amar" },
        { "pais": "China", "provincia": "Meikeng" },
        { "pais": "Poland", "provincia": "Giedlarowa" },
        { "pais": "Switzerland", "provincia": "Zürich" },
        { "pais": "China", "provincia": "Xinshi" },
        { "pais": "China", "provincia": "Zengguang" },
        { "pais": "Dominican Republic", "provincia": "La Agustina" },
        { "pais": "Brazil", "provincia": "Ariquemes" },
        { "pais": "Philippines", "provincia": "Barbaza" },
        { "pais": "Russia", "provincia": "Fershampenuaz" },
        { "pais": "Indonesia", "provincia": "Cireundang" },
        { "pais": "Tajikistan", "provincia": "Khŭjand" },
        { "pais": "Ukraine", "provincia": "Bibrka" },
        { "pais": "Dominican Republic", "provincia": "Constanza" },
        { "pais": "Sweden", "provincia": "Bollnäs" },
        { "pais": "Philippines", "provincia": "Tigpalay" },
        { "pais": "Indonesia", "provincia": "Hewa" },
        { "pais": "Bosnia and Herzegovina", "provincia": "Bosanski Novi" },
        { "pais": "Afghanistan", "provincia": "Khōshāmand" },
        { "pais": "Canada", "provincia": "Princeville" },
        { "pais": "Kuwait", "provincia": "Al Farwānīyah" },
        { "pais": "Portugal", "provincia": "Vila Fria" },
        { "pais": "Brazil", "provincia": "Guaratinguetá" },
        { "pais": "Azerbaijan", "provincia": "Pushkino" },
        { "pais": "Nigeria", "provincia": "Ekpoma" },
        { "pais": "France", "provincia": "Valenciennes" },
        { "pais": "China", "provincia": "Changhao" },
        { "pais": "China", "provincia": "Wenhe" },
        { "pais": "Bolivia", "provincia": "Trinidad" },
        { "pais": "Tanzania", "provincia": "Rujewa" },
        { "pais": "Indonesia", "provincia": "Cikadu" },
        { "pais": "Canada", "provincia": "Niagara Falls" },
        { "pais": "Indonesia", "provincia": "Kembangkerang Lauk Timur" },
        { "pais": "Sweden", "provincia": "Söderköping" },
        { "pais": "China", "provincia": "Xiangxiang" },
        { "pais": "China", "provincia": "Har Nur" },
        { "pais": "Argentina", "provincia": "Florentino Ameghino" },
        { "pais": "Bosnia and Herzegovina", "provincia": "Vidoši" },
        { "pais": "China", "provincia": "Taibai" },
        { "pais": "Russia", "provincia": "Shalakusha" },
        { "pais": "Portugal", "provincia": "Vila Verde" },
        { "pais": "United States", "provincia": "San Antonio" },
        { "pais": "Philippines", "provincia": "Kudanding" },
        { "pais": "China", "provincia": "Changqiao" },
        { "pais": "Argentina", "provincia": "Chimbas" },
        { "pais": "Palestinian Territory", "provincia": "Bayt ‘Īnūn" },
        { "pais": "South Africa", "provincia": "Mount Frere" },
        { "pais": "Malaysia", "provincia": "Petaling Jaya" },
        { "pais": "Vietnam", "provincia": "Thị Trấn Bình Mỹ" },
        { "pais": "Botswana", "provincia": "Ghanzi" },
        { "pais": "Thailand", "provincia": "Phra Phutthabat" },
        { "pais": "Syria", "provincia": "Sahnaiya" },
        { "pais": "Malaysia", "provincia": "Kangar" },
        { "pais": "Japan", "provincia": "Kariya" },
        { "pais": "Sweden", "provincia": "Ronneby" },
        { "pais": "Brazil", "provincia": "Campo Alegre" },
        { "pais": "Poland", "provincia": "Nielisz" },
        { "pais": "China", "provincia": "Xinjia" },
        { "pais": "Indonesia", "provincia": "Op" },
        { "pais": "China", "provincia": "Xazgat" },
        { "pais": "Philippines", "provincia": "Guihing Proper" },
        { "pais": "Argentina", "provincia": "La Paz" },
        { "pais": "Indonesia", "provincia": "Penanggungan" },
        { "pais": "China", "provincia": "Xilai" },
        { "pais": "Sweden", "provincia": "Linköping" },
        { "pais": "China", "provincia": "Fengqiao" },
        { "pais": "Russia", "provincia": "Novoaleksandrovsk" },
        { "pais": "China", "provincia": "Dashuipo" },
        { "pais": "Poland", "provincia": "Nakło nad Notecią" },
        { "pais": "China", "provincia": "Danyang" },
        { "pais": "Philippines", "provincia": "Balud" },
        { "pais": "Poland", "provincia": "Wschowa" },
        { "pais": "Guadeloupe", "provincia": "Pointe-à-Pitre" },
        { "pais": "Brazil", "provincia": "Assis" },
        { "pais": "Venezuela", "provincia": "Cúa" },
        { "pais": "China", "provincia": "Yanghong" },
        { "pais": "China", "provincia": "Qiangtou" },
        { "pais": "China", "provincia": "Erjia" },
        { "pais": "China", "provincia": "Yueyang" },
        { "pais": "Micronesia", "provincia": "Oneop" },
        { "pais": "China", "provincia": "Yingde’er" },
        { "pais": "Indonesia", "provincia": "Delanggu" },
        { "pais": "Colombia", "provincia": "Sabanalarga" },
        { "pais": "China", "provincia": "Chenxikou" },
        { "pais": "Tanzania", "provincia": "Kihurio" },
        { "pais": "Uzbekistan", "provincia": "Nurota Shahri" },
        { "pais": "Philippines", "provincia": "Maluko" },
        { "pais": "Russia", "provincia": "Medveditskiy" },
        { "pais": "Philippines", "provincia": "Agbannawag" },
        { "pais": "Sweden", "provincia": "Svalöv" },
        { "pais": "Mexico", "provincia": "Lazaro Cardenas" },
        { "pais": "Russia", "provincia": "Verbilki" },
        { "pais": "Bolivia", "provincia": "Roboré" },
        { "pais": "Portugal", "provincia": "Arcos" },
        { "pais": "Sweden", "provincia": "Bohus" },
        { "pais": "China", "provincia": "Hou’an" },
        { "pais": "China", "provincia": "Haoguantun" },
        { "pais": "Poland", "provincia": "Skulsk" },
        { "pais": "Russia", "provincia": "Monino" },
        { "pais": "Iceland", "provincia": "Grindavík" },
        { "pais": "Indonesia", "provincia": "Sirnasari" },
        { "pais": "Czech Republic", "provincia": "Mirovice" },
        { "pais": "Thailand", "provincia": "Sadao" },
        { "pais": "Poland", "provincia": "Chwaszczyno" },
        { "pais": "Philippines", "provincia": "Maguilling" },
        { "pais": "France", "provincia": "Montigny-lès-Metz" },
        { "pais": "China", "provincia": "Jinshan" },
        { "pais": "South Africa", "provincia": "Nkandla" },
        { "pais": "Portugal", "provincia": "Vila Chã de Ourique" },
        { "pais": "Brazil", "provincia": "Miguel Calmon" },
        { "pais": "Portugal", "provincia": "Portela" },
        { "pais": "Ireland", "provincia": "Ratoath" },
        { "pais": "Indonesia", "provincia": "Sampungu" },
        { "pais": "France", "provincia": "Poligny" },
        { "pais": "Germany", "provincia": "Gelsenkirchen" },
        { "pais": "Libya", "provincia": "Masallātah" },
        { "pais": "Portugal", "provincia": "Serra da Boa Viagem" },
        { "pais": "Albania", "provincia": "Blerim" },
        { "pais": "Russia", "provincia": "Yelan’-Kolenovskiy" },
        { "pais": "Ethiopia", "provincia": "Mendī" },
        { "pais": "Thailand", "provincia": "Amnat Charoen" },
        { "pais": "Poland", "provincia": "Smołdzino" },
        { "pais": "Indonesia", "provincia": "Panayagan" },
        { "pais": "Venezuela", "provincia": "Ciudad Bolívar" },
        { "pais": "Nigeria", "provincia": "Dapchi" },
        { "pais": "Jamaica", "provincia": "Sandy Bay" },
        { "pais": "China", "provincia": "Jiangkou" },
        { "pais": "China", "provincia": "Qianpai" },
        { "pais": "Iran", "provincia": "Līkak" },
        { "pais": "China", "provincia": "Tiehe" },
        { "pais": "Morocco", "provincia": "Goulmima" },
        { "pais": "China", "provincia": "Huiqi" },
        { "pais": "Brazil", "provincia": "Não Me Toque" },
        { "pais": "Colombia", "provincia": "San Carlos" },
        { "pais": "Armenia", "provincia": "Mrgavan" },
        { "pais": "Kazakhstan", "provincia": "Shalqīya" },
        { "pais": "Brazil", "provincia": "Escada" },
        { "pais": "Nigeria", "provincia": "Ogurugu" },
        { "pais": "Comoros", "provincia": "Mavingouni" },
        { "pais": "China", "provincia": "Tangwang" },
        { "pais": "Russia", "provincia": "Yemva" },
        { "pais": "Lithuania", "provincia": "Mastaiciai" },
        { "pais": "Indonesia", "provincia": "Jurak Lao’" },
        { "pais": "Brazil", "provincia": "Frutal" },
        { "pais": "Tunisia", "provincia": "El Ksour" },
        { "pais": "Sweden", "provincia": "Göteborg" },
        { "pais": "Democratic Republic of the Congo", "provincia": "Mbandaka" },
        { "pais": "China", "provincia": "Mingjiu" },
        { "pais": "United States", "provincia": "Tempe" },
        { "pais": "Kazakhstan", "provincia": "Aksu" },
        { "pais": "China", "provincia": "Keli" },
        { "pais": "Poland", "provincia": "Chotcza" },
        { "pais": "Russia", "provincia": "Solnechnyy" },
        { "pais": "Indonesia", "provincia": "Mmaaf" },
        { "pais": "Peru", "provincia": "Ramón Castilla" },
        { "pais": "Germany", "provincia": "Hamburg Bramfeld" },
        { "pais": "China", "provincia": "Luotaping" },
        { "pais": "Philippines", "provincia": "Bongao" },
        { "pais": "Nicaragua", "provincia": "Tipitapa" },
        { "pais": "Ukraine", "provincia": "Mospyne" },
        { "pais": "Cuba", "provincia": "Mariel" },
        { "pais": "Philippines", "provincia": "Mapulo" },
        { "pais": "Indonesia", "provincia": "Sapeken" },
        { "pais": "Colombia", "provincia": "Curití" },
        { "pais": "Indonesia", "provincia": "Sampangbitung" },
        { "pais": "Luxembourg", "provincia": "Schieren" },
        { "pais": "Indonesia", "provincia": "Keleleng" },
        { "pais": "China", "provincia": "Xinchenglu" },
        { "pais": "Indonesia", "provincia": "Sumbergebang" },
        { "pais": "Indonesia", "provincia": "Gununglajang" },
        { "pais": "Thailand", "provincia": "Bang Len" },
        { "pais": "Finland", "provincia": "Forssa" },
        { "pais": "Greece", "provincia": "Ágios Spyrídon" },
        { "pais": "China", "provincia": "Shuanghe" },
        { "pais": "Peru", "provincia": "Ocongate" },
        { "pais": "France", "provincia": "Saint-Étienne-du-Rouvray" },
        { "pais": "Indonesia", "provincia": "Mboto" },
        { "pais": "Sri Lanka", "provincia": "Valvedditturai" },
        { "pais": "Indonesia", "provincia": "Pasirhuni" },
        { "pais": "China", "provincia": "Huangjindong" },
        { "pais": "Philippines", "provincia": "Calachuchi" },
        { "pais": "Sweden", "provincia": "Helsingborg" },
        { "pais": "China", "provincia": "Qingyang" },
        { "pais": "Indonesia", "provincia": "Kotabaru" },
        { "pais": "Mexico", "provincia": "Buenavista" },
        { "pais": "Venezuela", "provincia": "Tinaco" },
        { "pais": "China", "provincia": "Leiguan" },
        { "pais": "Micronesia", "provincia": "Palikir - National Government Center" },
        { "pais": "Indonesia", "provincia": "Rajadesa" },
        { "pais": "Ukraine", "provincia": "Pochayiv" },
        { "pais": "Poland", "provincia": "Lachowice" },
        { "pais": "Russia", "provincia": "Kangalassy" },
        { "pais": "Nigeria", "provincia": "Lafiagi" },
        { "pais": "Indonesia", "provincia": "Sawahrandu" },
        { "pais": "Thailand", "provincia": "Non Sang" },
        { "pais": "Indonesia", "provincia": "Wailebe" },
        { "pais": "Nicaragua", "provincia": "San Rafael del Sur" },
        { "pais": "China", "provincia": "Honghe" },
        { "pais": "China", "provincia": "Jinzhou" },
        { "pais": "China", "provincia": "Hongping" },
        { "pais": "Bulgaria", "provincia": "Balgarevo" },
        { "pais": "Finland", "provincia": "Hollola" },
        { "pais": "Serbia", "provincia": "Bajina Bašta" },
        { "pais": "United States", "provincia": "Cedar Rapids" },
        { "pais": "Philippines", "provincia": "Nambalan" },
        { "pais": "Indonesia", "provincia": "Sukasada" },
        { "pais": "Czech Republic", "provincia": "Jarošov nad Nežárkou" },
        { "pais": "Indonesia", "provincia": "Kabar Utara" },
        { "pais": "Bosnia and Herzegovina", "provincia": "Marićka" },
        { "pais": "China", "provincia": "Hongyuan" },
        { "pais": "Russia", "provincia": "Vybor" },
        { "pais": "France", "provincia": "Orléans" },
        { "pais": "Nigeria", "provincia": "Oke Iho" },
        { "pais": "Czech Republic", "provincia": "Višňové" },
        { "pais": "Portugal", "provincia": "Cimo de Vila" },
        { "pais": "Nicaragua", "provincia": "Puerto Cabezas" },
        { "pais": "China", "provincia": "Changning" },
        { "pais": "Japan", "provincia": "Yaizu" },
        { "pais": "Philippines", "provincia": "Liozon" },
        { "pais": "Japan", "provincia": "Ōhara" },
        { "pais": "Brazil", "provincia": "Caeté" },
        { "pais": "Indonesia", "provincia": "Liliba" },
        { "pais": "China", "provincia": "Yuwan" },
        { "pais": "China", "provincia": "Nagqu" },
        { "pais": "China", "provincia": "Fuchang" },
        { "pais": "Panama", "provincia": "Pacora" },
        { "pais": "North Korea", "provincia": "Yŏnggwang-ŭp" },
        { "pais": "Japan", "provincia": "Arai" },
        { "pais": "Guatemala", "provincia": "Colotenango" },
        { "pais": "China", "provincia": "Huxi" },
        { "pais": "Germany", "provincia": "Hamburg" },
        { "pais": "Slovenia", "provincia": "Šmartno pri Litiji" },
        { "pais": "Mongolia", "provincia": "Sangiyn Dalay" },
        { "pais": "Indonesia", "provincia": "Fatuulan" },
        { "pais": "Russia", "provincia": "Yur’yev-Pol’skiy" },
        { "pais": "Pakistan", "provincia": "Faisalābād" },
        { "pais": "China", "provincia": "Mataigou" },
        { "pais": "Azerbaijan", "provincia": "Neftçala" },
        { "pais": "Ukraine", "provincia": "Popasna" },
        { "pais": "China", "provincia": "Xiamazhuang" },
        { "pais": "Greece", "provincia": "Lápas" },
        { "pais": "Mexico", "provincia": "Vicente Guerrero" },
        { "pais": "China", "provincia": "Guantouzui" },
        { "pais": "Portugal", "provincia": "Vessada" },
        { "pais": "New Zealand", "provincia": "Methven" },
        { "pais": "Malaysia", "provincia": "Kota Kinabalu" },
        { "pais": "Mongolia", "provincia": "Ulaan-Uul" },
        { "pais": "Russia", "provincia": "Zhukovskiy" },
        { "pais": "Indonesia", "provincia": "Grugul" },
        { "pais": "Philippines", "provincia": "Iligan City" },
        { "pais": "Indonesia", "provincia": "Padangtikar" },
        { "pais": "Venezuela", "provincia": "Sabana Grande" },
        { "pais": "Jordan", "provincia": "Jarash" },
        { "pais": "Indonesia", "provincia": "Pasirmukti" },
        { "pais": "Dominican Republic", "provincia": "Pedro Sánchez" },
        { "pais": "Ukraine", "provincia": "Fontanka" },
        { "pais": "China", "provincia": "Caoxi" },
        { "pais": "China", "provincia": "Zonghan" },
        { "pais": "Indonesia", "provincia": "Cigadog" },
        { "pais": "Czech Republic", "provincia": "Bochov" },
        { "pais": "Nigeria", "provincia": "Abuja" },
        { "pais": "Portugal", "provincia": "Cortes" },
        { "pais": "Iran", "provincia": "Kalāleh" },
        { "pais": "Venezuela", "provincia": "Quiriquire" },
        { "pais": "Sweden", "provincia": "Stockholm" },
        { "pais": "Czech Republic", "provincia": "Nové Město pod Smrkem" },
        { "pais": "Portugal", "provincia": "Casa Nova" },
        { "pais": "China", "provincia": "Zhenghu" },
        { "pais": "Vietnam", "provincia": "Chư Sê" },
        { "pais": "Portugal", "provincia": "Guilhabreu" },
        { "pais": "Belarus", "provincia": "Krasnapollye" },
        { "pais": "South Africa", "provincia": "Colesberg" },
        { "pais": "China", "provincia": "Huansheng" },
        { "pais": "China", "provincia": "Nanping" },
        { "pais": "Philippines", "provincia": "Teresa" },
        { "pais": "China", "provincia": "Leping" },
        { "pais": "China", "provincia": "Zhuhong" },
        { "pais": "Albania", "provincia": "Laç" },
        { "pais": "Albania", "provincia": "Xibër-Murrizë" },
        { "pais": "Colombia", "provincia": "Rovira" },
        { "pais": "Poland", "provincia": "Kuźnia Raciborska" },
        { "pais": "Bangladesh", "provincia": "Fatikchari" },
        { "pais": "Philippines", "provincia": "New Panamao" },
        { "pais": "South Africa", "provincia": "Graksop" },
        { "pais": "Russia", "provincia": "Sovetskoye" },
        { "pais": "Greece", "provincia": "Palaióchora" },
        { "pais": "United States", "provincia": "Scottsdale" },
        { "pais": "Bolivia", "provincia": "Yumani" },
        { "pais": "Tanzania", "provincia": "Chanika" },
        { "pais": "Brazil", "provincia": "Campos do Jordão" },
        { "pais": "Montenegro", "provincia": "Rožaje" },
        { "pais": "France", "provincia": "Issoudun" },
        { "pais": "South Africa", "provincia": "Atlantis" },
        { "pais": "Poland", "provincia": "Żelistrzewo" },
        { "pais": "Latvia", "provincia": "Zilupe" },
        { "pais": "China", "provincia": "Beiling" },
        { "pais": "Indonesia", "provincia": "Kolobolon" },
        { "pais": "Malaysia", "provincia": "Klang" },
        { "pais": "Philippines", "provincia": "Santa Maria" },
        { "pais": "Brazil", "provincia": "Santana do Paraíso" },
        { "pais": "Tanzania", "provincia": "Dar es Salaam" },
        { "pais": "Philippines", "provincia": "Siayan" },
        { "pais": "Palestinian Territory", "provincia": "Iktābah" },
        { "pais": "Philippines", "provincia": "Naval" },
        { "pais": "Nigeria", "provincia": "Ode" },
        { "pais": "Indonesia", "provincia": "Kloangrotat" },
        { "pais": "Palestinian Territory", "provincia": "Bayt ‘Anān" },
        { "pais": "El Salvador", "provincia": "Concepción de Ataco" },
        { "pais": "Italy", "provincia": "Villanova" },
        { "pais": "China", "provincia": "Tonggu" },
        { "pais": "China", "provincia": "Baikouquan" },
        { "pais": "Morocco", "provincia": "Sidi Redouane" },
        { "pais": "China", "provincia": "Huangji" },
        { "pais": "Russia", "provincia": "Vikhorevka" }];
    return data;
}
