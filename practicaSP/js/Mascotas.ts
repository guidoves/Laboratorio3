/// <reference path="Animal.ts"/>

namespace Abm {

    export class Perro extends Animal {

        private _id: number;
        private _tipo: eTipo;

        public get Tipo(): string {
            return this._tipo;
        }

        constructor(nombre: string, edad: number, patas: number, id: number) {
            super(nombre, edad, patas);
            this.Id = id;
            this._tipo = eTipo.Perro;
        }

        public get Id(): number {
            return this._id;
        }
        public set Id(v: number) {
            this._id = v;
        }

        toJson(): string {

            let str:string = super.toJson().replace("}","");
            let returnJson = str + `,"id":"${this.Id}","tipo":"${this.Tipo}"}`;
            return returnJson;
        }
    }

    export class Gato extends Animal {

        private _id: number;
        private _tipo: eTipo;

        public get Tipo(): string {
            return this._tipo;
        }

        constructor(nombre: string, edad: number, patas: number, id: number) {
            super(nombre, edad, patas);
            this.Id = id;
            this._tipo = eTipo.Gato;
        }

        public get Id(): number {
            return this._id;
        }
        public set Id(v: number) {
            this._id = v;
        }

        toJson(): string {
            let str:string = super.toJson().replace("}","");
            let returnJson = str + `,"id":"${this.Id}","tipo":"${this.Tipo}"}`;
            return returnJson;
        }
    }

    export class Roedor extends Animal {

        private _id: number;
        private _tipo: eTipo;

        public get Tipo(): string {
            return this._tipo;
        }

        constructor(nombre: string, edad: number, patas: number, id: number) {
            super(nombre, edad, patas);
            this.Id = id;
            this._tipo = eTipo.Roedor;
        }

        public get Id(): number {
            return this._id;
        }
        public set Id(v: number) {
            this._id = v;
        }

        toJson(): string {

            let str:string = super.toJson().replace("}","");
            let returnJson = str + `,"id":"${this.Id}","tipo":"${this.Tipo}"}`;
            return returnJson;
        }
    }

    export class Ave extends Animal {

        private _id: number;
        private _tipo: eTipo;

        public get Tipo(): string {
            return this._tipo;
        }

        constructor(nombre: string, edad: number, patas: number, id: number) {
            super(nombre, edad, patas);
            this.Id = id;
            this._tipo = eTipo.Ave;
        }

        public get Id(): number {
            return this._id;
        }
        public set Id(v: number) {
            this._id = v;
        }

        toJson(): string {

            let str:string = super.toJson().replace("}","");
            let returnJson = str + `,"id":"${this.Id}","tipo":"${this.Tipo}"}`;
            return returnJson;
        }
    }

    export class Pez extends Animal {

        private _id: number;
        private _tipo: eTipo;

        public get Tipo(): string {
            return this._tipo;
        }

        constructor(nombre: string, edad: number, patas: number, id: number) {
            super(nombre, edad, patas);
            this.Id = id;
            this._tipo = eTipo.Pez;
        }

        public get Id(): number {
            return this._id;
        }
        public set Id(v: number) {
            this._id = v;
        }

        toJson(): string {

            let str:string = super.toJson().replace("}","");
            let returnJson = str + `,"id":"${this.Id}","tipo":"${this.Tipo}"}`;
            return returnJson;
        }
    }
}