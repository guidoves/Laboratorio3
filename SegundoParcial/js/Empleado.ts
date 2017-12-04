/// <reference path="Persona.ts"/>
namespace Sp {

    export class Empleado extends Persona {

        public legajo: number;
        public foto: string;
        public id:number;

        constructor(nombre: string, apellido: string, edad: number, legajo: number, foto: string,id:number,sexo:string) {
            super(nombre, apellido, edad, sexo);

            this.legajo = legajo;
            this.foto = foto;
            this.id = id;
        }

        toJson(): string {
            let str:string = super.toJson().replace("}",",");
            let returnJson = str + `'legajo':'${this.legajo}','foto':'${this.foto}'}`;
            return returnJson;
        }
    }
}