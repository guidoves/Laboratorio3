
// .html() .text() .before() .after() .append() .prepend()


$(function(){

  /*  alert($("#contenedor").html());

   $("#contenedor").html("<p>Esto es un parrafo que reemplaza a lo que habia en el div</p>");

   alert($("#contenedor").html());
*/

// alert($("#contenedor h2").html());
$("#contenedor").before("<p>Esto es un parrado agregado con append</p>");

});

