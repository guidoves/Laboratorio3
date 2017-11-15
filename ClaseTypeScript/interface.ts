interface IXmen{
    nombre:string,
    peleasGanadas:number;
    otroAtributo:string;
    miMetodo():string;
}

function enviarMision(xmen:{nombre:string}){
    console.log(xmen.nombre);
}

let xmen:IXmen;
xmen.nombre = "Ciclope";
xmen.peleasGanadas = 4;
xmen.otroAtributo = "otroAtributo";

enviarMision(xmen);

class Xmen2 implements IXmen{
    nombre: string;
    peleasGanadas: number;
    otroAtributo: string;

    miMetodo():string{
        return "HOLA";
    }
    
}

let xmen2:Xmen2 = new Xmen2();
console.log(xmen2.miMetodo());