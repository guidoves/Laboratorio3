namespace proyecto{
    export class Persona{
        public nombre:string;
        public apellido:string;
        public dni:number;
        public fNacimiento:string;
        public sexo:string;
        public direccion:string;
        public telefono:string;
        public estadoCivil:string;
        public foto:string;
        public edad:number;

        constructor(nombre:string, apellido:string, dni:number, fNacimiento:string, sexo:string, direccion:string, telefono:string, estadoCivil:string,foto:string){
            this.apellido = apellido;
            this.direccion = direccion;
            this.dni = dni;
            this.estadoCivil = estadoCivil;
            this.fNacimiento = fNacimiento;
            this.nombre = nombre;
            this.sexo = sexo;
            this.telefono = telefono;
            this.foto = foto;
            this.edad = CalcularEdad(fNacimiento);
        }
    }
}