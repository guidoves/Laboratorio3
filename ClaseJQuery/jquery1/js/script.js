$(function(){

    //Agregar un manejador de eventos
$("#boton1").click( manejadorBoton);





});

function manejadorBoton(){
    var nombre = $("#nombre").val();

    alert(nombre);
}