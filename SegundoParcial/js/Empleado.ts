/// <reference path="Persona.ts"/>
namespace Sp {

    export class Empleado extends Persona {

        public legajo: number;
        public foto: string;

        constructor(nombre: string, apellido: string, edad: number, legajo: number, foto: string) {
            super(nombre, apellido, edad);

            this.legajo = legajo;
            this.foto = foto;
        }

        toJson(): string {
            let str:string = super.toJson().replace("}",",");
            let returnJson = str + `'legajo':'${this.legajo}','foto':'${this.foto}'}`;
            return returnJson;
        }
    }
}