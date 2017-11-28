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
            var str = _super.prototype.toJson.call(this).replace("}", "");
            var returnJson = str + (",\"id\":\"" + this.Id + "\",\"tipo\":\"" + this.Tipo + "\"}");
            return returnJson;
        };
        return Perro;
    }(Abm.Animal));
    Abm.Perro = Perro;
    var Gato = /** @class */ (function (_super) {
        __extends(Gato, _super);
        function Gato(nombre, edad, patas, id) {
            var _this = _super.call(this, nombre, edad, patas) || this;
            _this.Id = id;
            _this._tipo = Abm.eTipo.Gato;
            return _this;
        }
        Object.defineProperty(Gato.prototype, "Tipo", {
            get: function () {
                return this._tipo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Gato.prototype, "Id", {
            get: function () {
                return this._id;
            },
            set: function (v) {
                this._id = v;
            },
            enumerable: true,
            configurable: true
        });
        Gato.prototype.toJson = function () {
            var str = _super.prototype.toJson.call(this).replace("}", "");
            var returnJson = str + (",\"id\":\"" + this.Id + "\",\"tipo\":\"" + this.Tipo + "\"}");
            return returnJson;
        };
        return Gato;
    }(Abm.Animal));
    Abm.Gato = Gato;
    var Roedor = /** @class */ (function (_super) {
        __extends(Roedor, _super);
        function Roedor(nombre, edad, patas, id) {
            var _this = _super.call(this, nombre, edad, patas) || this;
            _this.Id = id;
            _this._tipo = Abm.eTipo.Roedor;
            return _this;
        }
        Object.defineProperty(Roedor.prototype, "Tipo", {
            get: function () {
                return this._tipo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Roedor.prototype, "Id", {
            get: function () {
                return this._id;
            },
            set: function (v) {
                this._id = v;
            },
            enumerable: true,
            configurable: true
        });
        Roedor.prototype.toJson = function () {
            var str = _super.prototype.toJson.call(this).replace("}", "");
            var returnJson = str + (",\"id\":\"" + this.Id + "\",\"tipo\":\"" + this.Tipo + "\"}");
            return returnJson;
        };
        return Roedor;
    }(Abm.Animal));
    Abm.Roedor = Roedor;
    var Ave = /** @class */ (function (_super) {
        __extends(Ave, _super);
        function Ave(nombre, edad, patas, id) {
            var _this = _super.call(this, nombre, edad, patas) || this;
            _this.Id = id;
            _this._tipo = Abm.eTipo.Ave;
            return _this;
        }
        Object.defineProperty(Ave.prototype, "Tipo", {
            get: function () {
                return this._tipo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ave.prototype, "Id", {
            get: function () {
                return this._id;
            },
            set: function (v) {
                this._id = v;
            },
            enumerable: true,
            configurable: true
        });
        Ave.prototype.toJson = function () {
            var str = _super.prototype.toJson.call(this).replace("}", "");
            var returnJson = str + (",\"id\":\"" + this.Id + "\",\"tipo\":\"" + this.Tipo + "\"}");
            return returnJson;
        };
        return Ave;
    }(Abm.Animal));
    Abm.Ave = Ave;
    var Pez = /** @class */ (function (_super) {
        __extends(Pez, _super);
        function Pez(nombre, edad, patas, id) {
            var _this = _super.call(this, nombre, edad, patas) || this;
            _this.Id = id;
            _this._tipo = Abm.eTipo.Pez;
            return _this;
        }
        Object.defineProperty(Pez.prototype, "Tipo", {
            get: function () {
                return this._tipo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pez.prototype, "Id", {
            get: function () {
                return this._id;
            },
            set: function (v) {
                this._id = v;
            },
            enumerable: true,
            configurable: true
        });
        Pez.prototype.toJson = function () {
            var str = _super.prototype.toJson.call(this).replace("}", "");
            var returnJson = str + (",\"id\":\"" + this.Id + "\",\"tipo\":\"" + this.Tipo + "\"}");
            return returnJson;
        };
        return Pez;
    }(Abm.Animal));
    Abm.Pez = Pez;
})(Abm || (Abm = {}));
