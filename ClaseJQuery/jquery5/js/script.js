
// .each()

$(function(){

   
var avengers = $("#imagenes img");

avengers.each(function(){
    $(this).fadeOut(5000).width("200");
});

var parrafos = $("#parrafos p");

var cont = 1;

parrafos.each(function(){
    $(this).text("parrafo " + cont);

    cont++;
});

});

