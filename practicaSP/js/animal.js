"use strict";
var Animal = /** @class */ (function () {
    function Animal(nombre, edad, patas) {
        this._nombre = nombre;
        this._edad = edad;
        this._patas = patas;
    }
    Object.defineProperty(Animal.prototype, "Nombre", {
        get: function () {
            return this._nombre;
        },
        set: function (nombre) {
            this._nombre = nombre;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animal.prototype, "Edad", {
        get: function () {
            return this._edad;
        },
        set: function (edad) {
            this._edad = edad;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animal.prototype, "Patas", {
        get: function () {
            return this._patas;
        },
        set: function (patas) {
            this._patas = patas;
        },
        enumerable: true,
        configurable: true
    });
    Animal.prototype.toJson = function () {
        var retorno = this.Nombre + "," + this.Edad + "," + this.Patas;
        return JSON.parse(retorno);
    };
    return Animal;
}());
