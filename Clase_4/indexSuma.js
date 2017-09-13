
/*function Sumar(a,b,callback)
{
    var resultado= parseInt(a) + parseInt(b);
    if(typeof(callback) === "function")
    {
        callback(resultado);
    }
    
}

window.onload = function()
{
    var btnSumar = document.getElementById("btnSumar");
    btnSumar.addEventListener('click',function()
    {
        var txtA = document.getElementById("txtA").value;
        var txtB = document.getElementById("txtB").value;
        Sumar(txtA,txtB,function(res)
        {
            alert("El resultado es: " + res);
        })
        
    })
    
}
*/

var Auto = function(nafta)
{
    var _nafta = nafta;

    this.setNafta = function(value)
    {
        _nafta = value;
    }
    this.getNafta = function()
    {
        return _nafta;
    }
}

var auto1 = new Auto(400);
var auto2  = new Auto(1500);
auto2.setNafta(300);
alert(auto1.getNafta() + auto2.getNafta());+