/// <reference path="Mascotas.ts"/>

$(document).ready(function () {

    $("#btnAgregar").on('click', AgregarAnimal);
    ObtenerData();
});

function AgregarAnimal() {

    let nombre = String($("#txtNombre").val());
    let edad = Number($("#txtEdad").val());
    let patas = Number($("#sPatas").val());
    let tipo = String($("#sTipo").val());
    let id = Number($("#txtId").val());

    if (!BuscarPorId(id)) {

        switch (tipo) {
            case Abm.eTipo.Perro:
                {
                    let animal = new Abm.Perro(nombre, edad, patas, id);

                    let data: string | null = localStorage.getItem('data');

                    let dataJson: JSON[] = data == null ? [] : JSON.parse(data);

                    dataJson.push(JSON.parse(animal.toJson()));

                    localStorage.setItem('data', JSON.stringify(dataJson));

                    alert('Mascota guardada!!');

                    break;
                }

            case Abm.eTipo.Gato:
                {
                    let animal = new Abm.Gato(nombre, edad, patas, id);

                    let data: string | null = localStorage.getItem('data');

                    let dataJson: JSON[] = data == null ? [] : JSON.parse(data);

                    dataJson.push(JSON.parse(animal.toJson()));

                    localStorage.setItem('data', JSON.stringify(dataJson));

                    alert('Mascota guardada!!');

                    break;
                }

            case Abm.eTipo.Ave:
                {
                    let animal = new Abm.Ave(nombre, edad, patas, id);

                    let data: string | null = localStorage.getItem('data');

                    let dataJson: JSON[] = data == null ? [] : JSON.parse(data);

                    dataJson.push(JSON.parse(animal.toJson()));

                    localStorage.setItem('data', JSON.stringify(dataJson));

                    alert('Mascota guardada!!');

                    break;
                }

            case Abm.eTipo.Pez:
                {
                    let animal = new Abm.Pez(nombre, edad, patas, id);

                    let data: string | null = localStorage.getItem('data');

                    let dataJson: JSON[] = data == null ? [] : JSON.parse(data);

                    dataJson.push(JSON.parse(animal.toJson()));

                    localStorage.setItem('data', JSON.stringify(dataJson));

                    alert('Mascota guardada!!');

                    break;
                }

            case Abm.eTipo.Roedor:
                {
                    let animal = new Abm.Roedor(nombre, edad, patas, id);

                    let data: string | null = localStorage.getItem('data');

                    let dataJson: JSON[] = data == null ? [] : JSON.parse(data);

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

}

function RestablecerForm() {
    $("#btnAgregar").html('Agregar Mascota');
    $("#btnAgregar").on('click', AgregarAnimal);
    $('#txtId').removeAttr('disabled');
}

function ObtenerData() {

    let data: string | null = localStorage.getItem('data');
    if (data != null) {

        let dataJson: JSON[] = JSON.parse(data);
        ArmarTabla(dataJson);
    }

}

function BuscarPorId(id: number): Boolean {

    let rta: Boolean = false;
    let data: string | null = localStorage.getItem('data');
    if (data != null) {

        let dataJson: any[] = JSON.parse(data);
        for (let index = 0; index < dataJson.length; index++) {
            if (dataJson[index]["id"] == id)
                rta = true;
        }
    }
    return rta;
}

function ArmarTabla(data: any[]) {

    $("#tabla").html("");

    let html = "<table class='table'><thead><th>Id</th><th>Nombre</th><th>Edad</th><th>Patas</th><th>Tipo</th></thead>"
        + "<tbody>";

    for (let index = 0; index < data.length; index++) {

        html += "<tr><td>" + data[index]["id"] + "</td><td>" + data[index]["nombre"] + "</td><td>" + data[index]["edad"] + "</td><td>" + data[index]["patas"] + "</td><td>" + data[index]["tipo"] + "</td><td><button onclick='Borrar(" + data[index]["id"] + ")'>Borrar</button><button onclick='Modificar(" + data[index]["id"] + ")'>Modificar</button></td></tr>";

    }

    html += "</tboby></table>";

    $("#tabla").html(html);
}

function Borrar(id: number) {
    let data: string | null = localStorage.getItem('data');
    let dataJson: any[] = JSON.parse(data);
    for (let index = 0; index < dataJson.length; index++) {
        if (dataJson[index]["id"] == id) {
            dataJson.splice(index, 1);
        }
    }
    localStorage.setItem('data', JSON.stringify(dataJson));
    ObtenerData();
}

function Modificar(id: number) {
    let data: string | null = localStorage.getItem('data');
    let dataJson: any[] = JSON.parse(data);
    for (let index = 0; index < dataJson.length; index++) {
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
                RestablecerForm();
                ObtenerData();

            })
        }
    }
}

function Filtro() {
    let data: string | null = localStorage.getItem('data');
    if (data != null) {

        let dataJson: any[] = JSON.parse(data);
        let filtro = $("#sFiltro").val();
        if (filtro == "TODOS") {
            ObtenerData();
        }
        else {
            let dataFiltrada = dataJson.filter(function (data) {

                return data["tipo"] == filtro;

            });
            ArmarTabla(dataFiltrada);
        }

        //console.log(dataFiltrada);
        //console.log(dataReduce); 
    }
}

function Filtro2() {
    let data: string | null = localStorage.getItem('data');
    if (data != null) {
        let dataJson: any[] = JSON.parse(data);
        let dataFiltrada:any[] =[];
        if ($('#chkId').is(':checked')) {
            dataFiltrada.push(dataJson.filter(function (data){
            
                return data["id"];

            }));
        }
        console.log(dataFiltrada);
        ArmarTabla(dataFiltrada);
        
    }
}