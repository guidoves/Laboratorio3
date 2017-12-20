$(function () {

    $("#btnEnviar").click(AgregarPersona);
    $("#nombre").keypress(restaurarBorder);
    $("#apellido").keypress(restaurarBorder);
    TraerPersonas();
});

function AgregarPersona() {

    if ($("#nombre").val() != '' && $("#apellido").val() != '') {

        var persona = "nombre=" + $("#nombre").val() + "&apellido=" + $("#apellido").val();
        $.ajax({
            url: "http://localhost:3000/agregarpersona",
            type: "POST",
            data: persona,
            success: function (response) {
                alert(response);
                TraerPersonas();
            }
        });
    }
    else {
        EstiloError();
    }
}

function EliminarPersona(i) {

    var req = "indice=" + i;
    $.ajax({
        url: "http://localhost:3000/eliminarpersona",
        type: "POST",
        data: req,
        success: function () {
            TraerPersonas();
        }
    });
}

function TraerPersonas() {

    $.ajax({
        url: "http://localhost:3000/traerpersonas",
        type: "GET",
        success: function (response) {

            CargarHTML(JSON.parse(response));
        }
    })
}

function ModificarPersona(i) {

    $.ajax({

        url: "http://localhost:3000/traerpersona?indice=" + i,
        type: "GET",
        success: function (response) {

            var persona = JSON.parse(response);
            $("#nombre").val(persona.nombre);
            $("#apellido").val(persona.apellido);
            $("#btnEnviar").val("MODIFICAR");
            $("#btnEnviar").off("click",AgregarPersona);
            $("#btnEnviar").on("click", function () {

                if ($("#nombre").val() != '' && $("#apellido").val() != '') {

                    var personaJson = { "nombre": $("#nombre").val(), "apellido": $("#apellido").val() };
                    $.ajax({
                        url: "http://localhost:3000/modificarpersona",
                        type: "POST",
                        data: "indice=" + i + "&persona=" + JSON.stringify(personaJson),
                        success: function (response) {
                            
                            location.reload();
                        }
                    });
                }
                else {
                    EstiloError();
                }
            });
        }
    });
}

function CargarHTML(a) {

    $("#body").html("");
    var i = 0;
    for (i = 0; i < a.length; i++) {

        $("#body").append("<tr><td>" + a[i].nombre + "</td><td>" + a[i].apellido + "</td><td id='" + i + "' class='accion'><input class='btn btn-primary btn-sm' type='button' value='Modificar' onclick=ModificarPersona(" + i + ")> <input class='btn btn-danger btn-sm' type='button' value='Eliminar' onclick=EliminarPersona(" + i + ")></td></tr>");
    }
}

function EstiloError() {

    $("#nombre").css("border-color", "red");
    $("#apellido").css("border-color", "red");
    $("#msjError").html("Debe ingresar nombre y apellido");
}

function restaurarBorder() {
    $("#nombre").css("border-color", "");
    $("#apellido").css("border-color", "");
    $("#msjError").html("");
}
