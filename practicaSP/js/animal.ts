class Animal{

    private _nombre:string;
    private _edad:number;
    private _patas:number;


    constructor(nombre:string,edad:number,patas:number){
        this._nombre = nombre;
        this._edad = edad;
        this._patas = patas;
    
    }

    set Nombre(nombre:string){
        this._nombre = nombre;
    }

    get Nombre():string{
        return this._nombre;
    }

    set Edad(edad:number){
        this._edad = edad;
    }

    get Edad():number{
        return this._edad;
    }

    set Patas(patas:number){
        this._patas = patas;
    }

    get Patas():number{
        return this._patas;
    }

    toJson():string{
        let retorno = `${this.Nombre},${this.Edad},${this.Patas}`;

        return JSON.parse(retorno);
    }


}
