
namespace Sp{

    export abstract class Persona{
    
        public nombre:string;
        public apellido:string;
        public edad:number;
    
        constructor(nombre:string , apellido:string, edad:number){
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
    
        toJson():string{
    
            let personaJson:string = `{'nombre':'${this.nombre}','apellido':'${this.apellido}','edad':'${this.edad}'}`; 
            return personaJson;
        }
    
    }
}