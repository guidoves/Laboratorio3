// Eventos del mouse
// .click() .dblclick()

$(function(){

   
var avengers = $("#imagenes img");

avengers.click(mostrar);

avengers.dblclick(mostrar2);



});

function mostrar(){

   
    alert("Hiciste click");
}

function mostrar2(){
    alert("Hiciste doble click");
}