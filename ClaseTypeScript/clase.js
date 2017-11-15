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
var Avenger = /** @class */ (function () {
    function Avenger(nombreReal, peleasGanadas, nombre) {
        this.nombre = nombre;
        this.nombreReal = nombreReal;
        this.peleasGanadas = peleasGanadas;
    }
    Object.defineProperty(Avenger.prototype, "nombre", {
        get: function () {
            return this._nombre;
        },
        //#region Propiedades
        set: function (nombre) {
            this._nombre = nombre;
        },
        enumerable: true,
        configurable: true
    });
    //#endregion
    Avenger.prototype.mostrar = function () {
        return this.nombre + "," + this.nombreReal + "," + this.peleasGanadas;
    };
    return Avenger;
}());
var Xmen = /** @class */ (function (_super) {
    __extends(Xmen, _super);
    function Xmen(nombreReal, peleasGanadas, poder, nombre) {
        var _this = _super.call(this, nombreReal, peleasGanadas, nombre) || this;
        _this._poder = poder;
        return _this;
    }
    Xmen.prototype.mostrar = function () {
        return _super.prototype.mostrar.call(this) + " " + this._poder;
    };
    return Xmen;
}(Avenger));
var Apocalipsis = /** @class */ (function () {
    function Apocalipsis(nombre) {
        this.nombre = nombre;
    }
    Object.defineProperty(Apocalipsis, "Instance", {
        get: function () {
            if (!(Apocalipsis._instance)) {
                Apocalipsis._instance = new Apocalipsis("HELLL");
            }
            return Apocalipsis._instance;
        },
        enumerable: true,
        configurable: true
    });
    return Apocalipsis;
}());
var a1 = new Avenger("Iron Man", 10, "Tony");
var a2 = new Avenger("Bruce", 20);
var x1 = new Xmen("Logan", 20, "Garra de acero", "Leopardo");
var array = new Array();
array.push(a1);
array.push(a2);
//a1.nombreReal = "Tony";
//a1.peleasGanadas = 10;
console.log(a1.mostrar());
console.log(a2.mostrar());
console.log(x1.mostrar());
console.log(Apocalipsis.Instance);
