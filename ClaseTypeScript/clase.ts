class Avenger{

    private _nombre:string;
    nombreReal:string;
    peleasGanadas:number;

    constructor(nombreReal:string, peleasGanadas:number,nombre?:string){

        this.nombre = nombre;
        this.nombreReal = nombreReal;
        this.peleasGanadas = peleasGanadas;
    }

    //#region Propiedades
    set nombre(nombre:string|undefined){
        this._nombre = nombre;
    }

    get nombre():string|undefined{
        return this._nombre;
    }
    //#endregion

    mostrar():string{

        return `${this.nombre},${this.nombreReal},${this.peleasGanadas}`;
    }

}

class Xmen extends Avenger{
    private _poder:string;

    constructor(nombreReal:string, peleasGanadas:number, poder:string,nombre?:string){
        super(nombreReal,peleasGanadas,nombre)
        this._poder = poder;
    }
    mostrar():string{
        return super.mostrar() + " " + this._poder;
    }
}

class Apocalipsis{

    private static _instance:Apocalipsis;
    private constructor(public nombre:string){

    }
    static get Instance():Apocalipsis{
        if(!(Apocalipsis._instance)){
            Apocalipsis._instance = new Apocalipsis("HELLL");
        }
        return Apocalipsis._instance;        
    }
}

let a1 = new Avenger("Iron Man",10,"Tony");
let a2 = new Avenger("Bruce",20);
let x1 = new Xmen("Logan",20,"Garra de acero","Leopardo");
let array = new Array<Avenger>();
array.push(a1);
array.push(a2);

//a1.nombreReal = "Tony";
//a1.peleasGanadas = 10;


console.log(a1.mostrar());
console.log(a2.mostrar());
console.log(x1.mostrar());
console.log(Apocalipsis.Instance);