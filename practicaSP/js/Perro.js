"use strict";
/// <reference path="Animal.ts"/>
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
var Abm;
(function (Abm) {
    var Perro = /** @class */ (function (_super) {
        __extends(Perro, _super);
        function Perro(nombre, edad, patas, id) {
            var _this = _super.call(this, nombre, edad, patas) || this;
            _this.Id = id;
            _this._tipo = Abm.eTipo.Perro;
            return _this;
        }
        Object.defineProperty(Perro.prototype, "Tipo", {
            get: function () {
                return this._tipo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Perro.prototype, "Id", {
            get: function () {
                return this._id;
            },
            set: function (v) {
                this._id = v;
            },
            enumerable: true,
            configurable: true
        });
        Perro.prototype.toJson = function () {
            var retorno = _super.prototype.toJson.call(this) + " " + this.Id + " " + this.Tipo;
            return JSON.stringify(retorno);
        };
        return Perro;
    }(Abm.Animal));
    Abm.Perro = Perro;
})(Abm || (Abm = {}));
