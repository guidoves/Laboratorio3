"use strict";
var Sp;
(function (Sp) {
    var Sexo;
    (function (Sexo) {
        Sexo[Sexo["Masculino"] = 0] = "Masculino";
        Sexo[Sexo["Femenino"] = 1] = "Femenino";
    })(Sexo = Sp.Sexo || (Sp.Sexo = {}));
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad, sexo) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.sexo = sexo;
        }
        Persona.prototype.toJson = function () {
            var personaJson = "{'nombre':'" + this.nombre + "','apellido':'" + this.apellido + "','edad':'" + this.edad + "'}";
            return personaJson;
        };
        return Persona;
    }());
    Sp.Persona = Persona;
})(Sp || (Sp = {}));
