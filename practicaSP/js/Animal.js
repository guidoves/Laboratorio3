"use strict";
var Abm;
(function (Abm) {
    var eTipo;
    (function (eTipo) {
        eTipo["Perro"] = "PERRO";
        eTipo["Gato"] = "GATO";
        eTipo["Roedor"] = "ROEDOR";
        eTipo["Ave"] = "AVE";
        eTipo["Pez"] = "PEZ";
    })(eTipo = Abm.eTipo || (Abm.eTipo = {}));
    var Animal = /** @class */ (function () {
        function Animal(nombre, edad, patas) {
            this.Nombre = nombre;
            this.Edad = edad;
            this.Patas = patas;
        }
        Object.defineProperty(Animal.prototype, "Nombre", {
            get: function () {
                return this._nombre;
            },
            set: function (v) {
                this._nombre = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animal.prototype, "Edad", {
            get: function () {
                return this._edad;
            },
            set: function (v) {
                this._edad = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animal.prototype, "Patas", {
            get: function () {
                return this._patas;
            },
            set: function (v) {
                this._patas = v;
            },
            enumerable: true,
            configurable: true
        });
        Animal.prototype.toJson = function () {
            var returnJson = "{\"nombre\":\"" + this.Nombre + "\",\"edad\":\"" + this.Edad + "\",\"patas\":\"" + this.Patas + "\"}";
            return returnJson;
        };
        return Animal;
    }());
    Abm.Animal = Animal;
})(Abm || (Abm = {}));
