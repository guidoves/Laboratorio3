"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path='Persona.ts'/>
var proyecto;
(function (proyecto) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, dni, fNacimiento, sexo, direccion, telefono, estadoCivil, foto, legajo, cuil, ingreso) {
            var _this = _super.call(this, nombre, apellido, dni, fNacimiento, sexo, direccion, telefono, estadoCivil, foto) || this;
            _this.cuil = cuil;
            _this.ingreso = ingreso;
            _this.legajo = legajo;
            return _this;
        }
        return Empleado;
    }(proyecto.Persona));
    proyecto.Empleado = Empleado;
})(proyecto || (proyecto = {}));
