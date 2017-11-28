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
/// <reference path="Animal.ts"/>
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
/// <reference path="Mascotas.ts"/>
$(document).ready(function () {
    $("#btnAgregar").on('click', AgregarAnimal);
    ObtenerData();
});
function AgregarAnimal() {
    var nombre = String($("#txtNombre").val());
    var edad = Number($("#txtEdad").val());
    var patas = Number($("#sPatas").val());
    var tipo = String($("#sTipo").val());
    var id = Number($("#txtId").val());
    if (!BuscarPorId(id)) {
        switch (tipo) {
            case Abm.eTipo.Perro:
                {
                    var animal = new Abm.Perro(nombre, edad, patas, id);
                    var data = localStorage.getItem('data');
                    var dataJson = data == null ? [] : JSON.parse(data);
                    dataJson.push(JSON.parse(animal.toJson()));
                    localStorage.setItem('data', JSON.stringify(dataJson));
                    alert('Mascota guardada!!');
                    break;
                }
            case Abm.eTipo.Gato:
                {
                    var animal = new Abm.Gato(nombre, edad, patas, id);
                    var data = localStorage.getItem('data');
                    var dataJson = data == null ? [] : JSON.parse(data);
                    dataJson.push(JSON.parse(animal.toJson()));
                    localStorage.setItem('data', JSON.stringify(dataJson));
                    alert('Mascota guardada!!');
                    break;
                }
            case Abm.eTipo.Ave:
                {
                    var animal = new Abm.Ave(nombre, edad, patas, id);
                    var data = localStorage.getItem('data');
                    var dataJson = data == null ? [] : JSON.parse(data);
                    dataJson.push(JSON.parse(animal.toJson()));
                    localStorage.setItem('data', JSON.stringify(dataJson));
                    alert('Mascota guardada!!');
                    break;
                }
            case Abm.eTipo.Pez:
                {
                    var animal = new Abm.Pez(nombre, edad, patas, id);
                    var data = localStorage.getItem('data');
                    var dataJson = data == null ? [] : JSON.parse(data);
                    dataJson.push(JSON.parse(animal.toJson()));
                    localStorage.setItem('data', JSON.stringify(dataJson));
                    alert('Mascota guardada!!');
                    break;
                }
            case Abm.eTipo.Roedor:
                {
                    var animal = new Abm.Roedor(nombre, edad, patas, id);
                    var data = localStorage.getItem('data');
                    var dataJson = data == null ? [] : JSON.parse(data);
                    dataJson.push(JSON.parse(animal.toJson()));
                    localStorage.setItem('data', JSON.stringify(dataJson));
                    alert('Mascota guardada!!');
                    break;
                }
        }
        ObtenerData();
        LimpiarForm();
    }
    else {
        LimpiarForm();
        alert('Ya existe el id');
    }
}
function LimpiarForm() {
    $("#txtNombre").val('');
    $('#txtEdad').val('');
    $('#txtId').val('');
    $('#txtsPatas').val(0);
    $('#txtsTipo').val(0);
    $("#btnAgregar").html('Agregar Mascota');
    $("#btnAgregar").on('click', AgregarAnimal);
    $('#txtId').removeAttr('disabled');
}
function ObtenerData() {
    var data = localStorage.getItem('data');
    if (data != null) {
        var dataJson = JSON.parse(data);
        ArmarTabla(dataJson);
    }
}
function BuscarPorId(id) {
    var rta = false;
    var data = localStorage.getItem('data');
    if (data != null) {
        var dataJson = JSON.parse(data);
        for (var index = 0; index < dataJson.length; index++) {
            if (dataJson[index]["id"] == id)
                rta = true;
        }
    }
    return rta;
}
function ArmarTabla(data) {
    $("#tabla").html("");
    var html = "<table class='table'><thead><th>Id</th><th>Nombre</th><th>Edad</th><th>Patas</th><th>Tipo</th></thead>"
        + "<tbody>";
    for (var index = 0; index < data.length; index++) {
        html += "<tr><td>" + data[index]["id"] + "</td><td>" + data[index]["nombre"] + "</td><td>" + data[index]["edad"] + "</td><td>" + data[index]["patas"] + "</td><td>" + data[index]["tipo"] + "</td><td><button onclick='Borrar(" + data[index]["id"] + ")'>Borrar</button><button onclick='Modificar(" + data[index]["id"] + ")'>Modificar</button></td></tr>";
    }
    html += "</tboby></table>";
    $("#tabla").html(html);
}
function Borrar(id) {
    var data = localStorage.getItem('data');
    var dataJson = JSON.parse(data);
    for (var index = 0; index < dataJson.length; index++) {
        if (dataJson[index]["id"] == id) {
            dataJson.splice(index, 1);
        }
    }
    localStorage.setItem('data', JSON.stringify(dataJson));
    ObtenerData();
}
function Modificar(id) {
    var data = localStorage.getItem('data');
    var dataJson = JSON.parse(data);
    var _loop_1 = function (index) {
        if (dataJson[index]["id"] == id) {
            $('#txtId').attr('disabled', 'disabled');
            $("#txtNombre").val(dataJson[index]['nombre']);
            $("#txtEdad").val(dataJson[index]['edad']);
            $("#sPatas").val(dataJson[index]['patas']);
            $("#sTipo").val(dataJson[index]['tipo']);
            $("#btnAgregar").off('click');
            $("#btnAgregar").html('Modificar Mascota');
            $("#btnAgregar").on('click', function () {
                dataJson[index]['nombre'] = $("#txtNombre").val();
                dataJson[index]['edad'] = $("#txtEdad").val();
                dataJson[index]['patas'] = $("#sPatas").val();
                dataJson[index]['tipo'] = $("#sTipo").val();
                localStorage.setItem('data', JSON.stringify(dataJson));
                LimpiarForm();
                ObtenerData();
            });
        }
    };
    for (var index = 0; index < dataJson.length; index++) {
        _loop_1(index);
    }
}
