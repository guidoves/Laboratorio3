"use strict";
var Sp;
(function (Sp) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        Persona.prototype.toJson = function () {
            var personaJson = "{'nombre':'" + this.nombre + "','apellido':'" + this.apellido + "','edad':'" + this.edad + "'}";
            return personaJson;
        };
        return Persona;
    }());
    Sp.Persona = Persona;
})(Sp || (Sp = {}));
