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
/// <reference path="Persona.ts"/>
var Sp;
(function (Sp) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, edad, legajo, foto, id, sexo) {
            var _this = _super.call(this, nombre, apellido, edad, sexo) || this;
            _this.legajo = legajo;
            _this.foto = foto;
            _this.id = id;
            return _this;
        }
        Empleado.prototype.toJson = function () {
            var str = _super.prototype.toJson.call(this).replace("}", ",");
            var returnJson = str + ("'legajo':'" + this.legajo + "','foto':'" + this.foto + "'}");
            return returnJson;
        };
        return Empleado;
    }(Sp.Persona));
    Sp.Empleado = Empleado;
})(Sp || (Sp = {}));
