/// <reference path='Persona.ts'/>
namespace proyecto{
    export class Empleado extends Persona{
        public legajo:number;
        public cuil:string;
        public ingreso:string;
        public egreso:string;
        public estado:string;

        constructor(nombre:string, apellido:string, dni:number, fNacimiento:string, sexo:string, direccion:string, telefono:string, estadoCivil:string,foto:string, legajo:number, cuil:string, ingreso:string, egreso?:string, estado?:string){
            super(nombre,apellido,dni,fNacimiento,sexo,direccion,telefono,estadoCivil,foto);
            this.cuil = cuil;
            this.ingreso = ingreso;
            this.legajo = legajo;
            if(estado == undefined){
                this.estado = 'ACTIVO';
            }
            else{
                this.estado = estado;
            }
            if(egreso == undefined){
            }
            else{
                this.egreso = egreso;
            }
        }
    }

    
}