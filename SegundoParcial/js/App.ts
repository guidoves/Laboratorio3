/// <reference path="Empleado.ts"/>
$(document).ready(function () {

    $("#btnAgregar").on('click', Alta);
    //CargarDatos();
    Filtro2();
    Filtro();
});

var imagen: string = '';

function Alta() {

    //Campos formulario
    let nombre:string = String($('#txtNombre').val());
    let apellido:string = String($('#txtApellido').val());
    let edad:number = Number($('#txtEdad').val());
    let legajo:number = Number($('#txtLegajo').val());
    let foto:string = imagen;
    let sexo:string = String($('#txtSexo').val());
    if (!BuscarPorLegajo(legajo) && legajo > 0) {

        //Crea objeto empleado
        let empleado: Sp.Empleado = new Sp.Empleado(nombre, apellido, edad, legajo, foto, EstablecerId(),sexo);
        // Trae un array con todos los empleados cargados.
        let arrayEmpleados: Sp.Empleado[] = TraerData();
        // Agrega el nuevo empleado al array
        arrayEmpleados.push(empleado);
        // Carga el localstorage con el array acualizado en formato JSON
        localStorage.setItem('empleados', JSON.stringify(arrayEmpleados));
        alert('Empleado agregado');
        LimpiarForm();
        //CargarDatos();
        Filtro2();

    }
    else { alert('Ya existe el numero de legajo o es invalido'); }
}

function Borrar(legajo: number) {
    let empleados: Sp.Empleado[] = TraerData();
    for (let index = 0; index < empleados.length; index++) {
        if (empleados[index].legajo == legajo) {
            empleados.splice(index, 1);
            break;
        }
    }
    localStorage.setItem('empleados', JSON.stringify(empleados));
    alert('Empleado Eliminado');
    Filtro2();
}

function Modificar(legajo: number) {
    let empleados: Sp.Empleado[] = TraerData();
    for (let index = 0; index < empleados.length; index++) {
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
            break;
        }
    }
}

function EstablecerId(): number {
    if (localStorage.getItem('id') != null) {
        let id: number = parseInt(String(localStorage.getItem('id')));
        id++;
        localStorage.setItem('id',id.toString());
        return id;
    }
    else {
        localStorage.setItem('id', '1');
        return 1;
    }
}

function BuscarPorLegajo(legajo: number): Boolean {

    let rta: Boolean = false;
    let data: Sp.Empleado[] = TraerData();
    for (let index = 0; index < data.length; index++) {
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

function TraerData(): Sp.Empleado[] {
    // Obtiene los datos del localstorage
    let data: string | null = localStorage.getItem('empleados');
    // Carga un array con los datos. decodifica el json.
    let empleadosData: any[] = data == null ? [] : JSON.parse(data);
    // Crea array del tipo de dato empleado,
    let arrayEmpleados: Sp.Empleado[] = [];
    if (empleadosData != null) {
        for (let index = 0; index < empleadosData.length; index++) {
            let empleado: Sp.Empleado = new Sp.Empleado(empleadosData[index]['nombre'], empleadosData[index]['apellido'], empleadosData[index]['edad'], empleadosData[index]['legajo'], empleadosData[index]['foto'], empleadosData[index]['id'], empleadosData[index]['sexo']);
            arrayEmpleados.push(empleado);
        }
    }
    return arrayEmpleados;
}

function CargarDatos() {
    let empleados: Sp.Empleado[] = TraerData();
    ActualizarTabla(empleados);
    Metricas();
}

function ActualizarTabla(empleados: any[] | null) {

    $("#tabla").html("");
    let html = "<table class='table'><thead><th class ='hId'>Id</th><th class ='hLegajo'>Legajo</th><th class ='hNombre'>Nombre</th><th class ='hApellido'>Apellido</th><th class ='hEdad'>Edad</th><th class ='hSexo'>Sexo</th><th class ='hFoto'>Foto</th></thead><tbody>";
    if (empleados != null) {

        for (let index = 0; index < empleados.length; index++) {
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

function Filtro2() {

    let empleados: Sp.Empleado[] = TraerData();
    let legajo: number[] = [];
    let nombre: string[] = [];
    let apellido: string[] = [];
    let edad: number[] = [];
    let foto: string[] = [];
    let id: number[] = [];
    let sexo: string[] = [];
    let resultado: Object[] = [];
    let flag: boolean = false;

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
        sexo = empleados.map(function(empleado){
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
        for (let index = 0; index < empleados.length; index++) {
            let objeto = new Object();
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

function Metricas(data:any[]) {
    //let empleados = TraerData();
    let sumEdad: number = 0;
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

function Filtro(){
    let filtro = $('#sFiltro').val();
    let data:Sp.Empleado[] = TraerData();
    switch(filtro){
        case 'TODO':
        {
            Metricas(data);
            break;
        }
        case 'E2030':
        {
            let dataFil = data.filter(function(empleado){
                return empleado.edad >= 20 && empleado.edad <= 30; 
            });
            Metricas(dataFil);
            break;
        }
        case 'E3160':
        {
            let dataFil = data.filter(function(empleado){
                return empleado.edad >= 31 && empleado.edad <= 60;
            });
            Metricas(dataFil);
            break;
        }
        case 'E60':
        {
            let dataFil = data.filter(function(empleado){
                return empleado.edad > 60;
            });
            Metricas(dataFil);
            break;
        }
        case 'HOMBRES':
        {
            let dataFil = data.filter(function(empleado){
                return empleado.sexo == 'Masculino';
            });
            Metricas(dataFil);
            break;
        }
        case 'MUJERES':
        {
            let dataFil = data.filter(function(empleado){
                return empleado.sexo == 'Femenino';
            });
            Metricas(dataFil);
            break;
        }
    }
}

