
namespace Sp{
    export enum Sexo{

        Masculino,
        Femenino
    }

    export abstract class Persona{
    
        public nombre:string;
        public apellido:string;
        public edad:number;
        public sexo:string;
    
        constructor(nombre:string , apellido:string, edad:number, sexo:string){
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.sexo = sexo;
        }
    
        toJson():string{
    
            let personaJson:string = `{'nombre':'${this.nombre}','apellido':'${this.apellido}','edad':'${this.edad}'}`; 
            return personaJson;
        }
    
    }
}