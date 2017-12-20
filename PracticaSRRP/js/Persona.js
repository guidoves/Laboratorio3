"use strict";
var proyecto;
(function (proyecto) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, dni, fNacimiento, sexo, direccion, telefono, estadoCivil, foto) {
            this.apellido = apellido;
            this.direccion = direccion;
            this.dni = dni;
            this.estadoCivil = estadoCivil;
            this.fNacimiento = fNacimiento;
            this.nombre = nombre;
            this.sexo = sexo;
            this.telefono = telefono;
            this.foto = foto;
        }
        return Persona;
    }());
    proyecto.Persona = Persona;
})(proyecto || (proyecto = {}));
