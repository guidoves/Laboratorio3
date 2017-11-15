function enviarMision(xmen) {
    console.log(xmen.nombre);
}
var xmen;
xmen.nombre = "Ciclope";
xmen.peleasGanadas = 4;
xmen.otroAtributo = "otroAtributo";
enviarMision(xmen);
var Xmen2 = /** @class */ (function () {
    function Xmen2() {
    }
    Xmen2.prototype.miMetodo = function () {
        return "HOLA";
    };
    return Xmen2;
}());
var xmen2 = new Xmen2();
console.log(xmen2.miMetodo());
