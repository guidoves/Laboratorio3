namespace Abm{

    export enum eTipo{

        Perro = 'PERRO',
        Gato = 'GATO',
        Roedor = 'ROEDOR',
        Ave = 'AVE',
        Pez = 'PEZ'
    }

    export abstract class Animal{

        protected _nombre:string;
        protected _edad:number;
        protected _patas:number;

        public get Nombre() : string {
            return this._nombre;
        }
        public set Nombre(v : string) {
            this._nombre = v;
        }
        public get Edad() : number {
            return this._edad;
        }
        public set Edad(v : number) {
            this._edad = v;
        }public get Patas() : number {
            return this._patas;
        }
        public set Patas(v : number) {
            this._patas = v;
        }

        constructor(nombre:string, edad:number, patas:number){
            this.Nombre = nombre;
            this.Edad = edad;
            this.Patas = patas;
        }
        
        toJson():string{
            let returnJson:string = `{"nombre":"${this.Nombre}","edad":"${this.Edad}","patas":"${this.Patas}"}`; 
            return returnJson;
        }
    }
}