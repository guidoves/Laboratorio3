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
    })
    CargarDatos();

});


var imagen: string = '';

function CargarDatos() {
    let empleados: proyecto.Empleado[] = TraerActivos();
    ActualizarTabla(empleados);
    //Metricas();
}

function Alta() {

    //Campos Formulario
    let nombre: string = String($('#txtNombre').val());
    let apellido: string = String($('#txtApellido').val());
    let dni: number = Number($('#txtDni').val());
    let fNacimiento: string = String($('#txtFecha').val());
    let sexo: string = String($('#txtSexo').val());
    let direccion: string = String($('#txtDireccion').val());
    let telefono: string = String($('#txtTelefono').val());
    let estadoCivil: string = String($('#txtEstadoCivil').val());
    let foto: string = imagen;
    let legajo: number = EstablecerLegajo();
    let cuil: string = String($('#txtCuil').val());
    let ingreso: string = String($('#txtIngreso').val());
    let empleado: proyecto.Empleado = new proyecto.Empleado(nombre, apellido, dni, fNacimiento, sexo, direccion, telefono, estadoCivil, foto, legajo, cuil, ingreso);
    let arrayEmpleados: proyecto.Empleado[] = TraerData();
    arrayEmpleados.push(empleado);
    localStorage.setItem('empleados', JSON.stringify(arrayEmpleados));
    alert('Empleado dado de alta');
    $('#btnAltaCerrar').click();//$('#alta').hide();
    CargarDatos();
    //
}

function Modificar(legajo: number) {
    let empleados = TraerData();
    let nombre = $('#mdNombre').val();
    let apellido = $('#mdApellido').val();
    let dni = $('#mdDni').val();
    let fNacimiento = $('#mdFecha').val();
    let direccion = $('#mdDireccion').val();
    let telefono = $('#mdTelefono').val();
    let sexo = $('#mdSexo').val();
    let estadoCivil = $('#mdEstadoCivil').val();
    let cuil = $('#mdCuil').val();
    let ingreso = $('#mdIngreso').val();
    let foto = $('#mdFoto').val();
    for (let index = 0; index < empleados.length; index++) {
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

function Borrar(legajo: number) {
    let empleados: proyecto.Empleado[] = TraerData();
    for (let index = 0; index < empleados.length; index++) {
        if (empleados[index].legajo == legajo) {
            empleados.splice(index, 1);
            break;
        }
    }
    localStorage.setItem('empleados', JSON.stringify(empleados));
    alert('Empleado Eliminado');
}

function BuscarPorLegajo(legajo: number): proyecto.Empleado[] {

    let data: proyecto.Empleado[] = TraerActivos();
    let retorno = data.filter(function (empleado) {
        return empleado.legajo == legajo;
    });
    return retorno;
}

function Baja(legajo: number) {
    let fEgreso = String($('#txtEgreso').val());
    let data: proyecto.Empleado[] = TraerData();
    for (let index = 0; index < data.length; index++) {
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
    let busqueda = $('#bajaBusqueda').val();
    let empleado: proyecto.Empleado[] = BuscarPorLegajo(Number(busqueda));
    if (empleado.length > 0) {
        let html = '<div><label>Nombre:&nbsp</label>' + empleado[0].nombre + '<img align="right" height="150" src="' + empleado[0].foto + '"><div><br>' +
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
        let html2 = '<button type="button" class="btn btn-danger" onclick="Baja(' + empleado[0].legajo + ')">Aceptar</button>' +
            '<button id="btnConfirmaCerrar" type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>';
        $('#confirmarFooter').html(html2);
    }
    else {
        let html = '<div class="alert alert-info"><strong>No hay resultados</strong></div>';
        $('#bajaBody').html(html);
    }
}

function ModificarModal() {
    let busqueda = $('#modificarBusqueda').val();
    let empleado: proyecto.Empleado[] = BuscarPorLegajo(Number(busqueda));
    if (empleado.length > 0) {
        let html = '<form id="frmModificar" onsubmit="Modificar(' + empleado[0].legajo + ')">' +
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
        let html = '<div class="alert alert-info"><strong>No hay resultados</strong></div>';
        $('#modificarBody').html(html);
    }
}



function Ver(legajo: number) {
    let html: string = '<h2>Datos Personales</h2><hr>';
    let empleados = BuscarPorLegajo(legajo);
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


function TraerData(): proyecto.Empleado[] {
    // Obtiene los datos del localstorage
    let data: string | null = localStorage.getItem('empleados');
    // Carga un array con los datos. decodifica el json.
    let empleadosData: any[] = data == null ? [] : JSON.parse(data);
    // Crea array del tipo de dato empleado,
    let arrayEmpleados: proyecto.Empleado[] = [];
    if (empleadosData != null) {
        for (let index = 0; index < empleadosData.length; index++) {
            let empleado: proyecto.Empleado = new proyecto.Empleado(empleadosData[index]['nombre'], empleadosData[index]['apellido'], empleadosData[index]['dni'], empleadosData[index]['fNacimiento'], empleadosData[index]['sexo'], empleadosData[index]['direccion'], empleadosData[index]['telefono'], empleadosData[index]['estadoCivil'], empleadosData[index]['foto'], empleadosData[index]['legajo'], empleadosData[index]['cuil'], empleadosData[index]['ingreso'], empleadosData[index]['egreso'], empleadosData[index]['estado']);
            arrayEmpleados.push(empleado);

        }
    }
    return arrayEmpleados;
}

function TraerActivos(): proyecto.Empleado[] {
    let data: proyecto.Empleado[] = TraerData();
    let activos = data.filter(function (empleado) {
        return empleado.estado == 'ACTIVO';
    });
    return activos;
}

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

function ActualizarTabla(empleados: any[]) {

    if (empleados.length > 0) {
        $("#tabla").html("");

        let html = "<table class='table table-hover'><thead><th class ='hLegajo'>Legajo</th><th class ='hNombre'>Nombre</th><th class ='hApellido'>Apellido</th><th class ='hDni'>Dni</th></thead><tbody>";
        for (let index = 0; index < empleados.length; index++) {
            html += "<tr><td class='hLegajo'>" + empleados[index].legajo + "</td><td class='hNombre'>" + empleados[index].nombre + "</td><td class ='hApellido'>" + empleados[index].apellido + "</td><td class ='hDni'>" + empleados[index].dni + "</td><td><button class='btn btn-primary' data-toggle='modal' data-target='#ver' onclick='Ver(" + empleados[index].legajo + ")'>Detalle</button></td></tr>";
        }

        html += "</tbody></table>";
        $("#tabla").html(html);
    }
    else {
        let html = '<table class="table table-hover"><div class="alert alert-info"><strong>No hay datos</strong></div></table>';
        $('#tabla').html(html);
    }
}

function EstablecerLegajo(): number {
    if (localStorage.getItem('legajo') != null) {
        let legajo: number = parseInt(String(localStorage.getItem('legajo')));
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

    let empleados: proyecto.Empleado[] = TraerActivos();
    let legajo: number[] = [];
    let nombre: string[] = [];
    let apellido: string[] = [];
    let dni: number[] = [];
    let resultado: Object[] = [];
    let flag: boolean = false;

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
        for (let index = 0; index < empleados.length; index++) {
            let objeto = new Object();
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

function CalcularEdad(fecha: string) {
    let hoy = new Date();
    let fnac = new Date(fecha);
    let edad = hoy.getFullYear() - fnac.getFullYear();
    let m = hoy.getMonth() - fnac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fnac.getDate())) {
        edad--;
    }
    return edad;
}

function Filtro2() {
    let filtro = $('#sFiltro').val();
    let data: proyecto.Empleado[] = TraerData();
    switch (filtro) {
        case 'TODOS':
            {
                Metricas(data);
                break;
            }
        case 'ACTIVOS':
            {
                let dataFil = data.filter(function (empleado) {
                    return empleado.estado == 'ACTIVO';
                });
                Metricas(dataFil);
                break;
            }
        case 'BAJA':
            {
                let dataFil = data.filter(function (empleado) {
                    return empleado.estado == 'BAJA';
                });
                Metricas(dataFil);
                break;
            }
    }
}

function Metricas(data:any[]) {
    //let empleados = TraerData();
    let sumEdad = data.reduce(function(anterior,actual){
        return anterior + actual.edad;
    },0);
    if (data.length != 0) {

        for (let index = 0; index < data.length; index++) {
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
