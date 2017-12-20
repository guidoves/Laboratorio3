var port = 3000;
var express=require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app=express();

var Personas = [
    { nombre: 'Juan', apellido: 'Suarez'},
    { nombre: 'Sol', apellido: 'Perez'},
    { nombre: 'Jose', apellido: 'Gomez'},
    { nombre: 'Valentina', apellido: 'Gimenes'}
];

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({ extended: false }));


app.post('/agregarpersona', function (req, res) {
    var nombre=req.body.nombre;
    var apellido=req.body.apellido;

    var nuevaPersona = {};
    nuevaPersona.nombre = nombre;
    nuevaPersona.apellido = apellido;
    console.log(nuevaPersona.nombre);
    Personas.push(nuevaPersona);    

    setTimeout(function() {

        return 0;
        
    }, 3000);
    
    res.send('Alta exitosa ' + nombre + ' ' + apellido);    
});


app.post('/eliminarpersona', function (req, res) {
    var indice=req.body.indice;
    Personas.splice(indice, 1);   
    
    res.send('Baja exitosa');    
});

app.post('/modificarpersona', function (req, res) {
    var indice=req.body.indice;
    var persona = req.body.persona;   
    Personas[indice]= JSON.parse(persona);  
    res.send('Modificacion exitosa');    
});

app.get('/traerpersonas', function (req, res) {
    pausecomp(1000);
    res.send(JSON.stringify(Personas));

});

app.get('/traerpersona', function (req, res) {

    var indice = req.query.indice;    
    res.send(JSON.stringify(Personas[indice]));    
});
;
var server=app.listen(port ,function(){
    console.log('Servidor web iniciado. Escuchando en el puerto ' + port);
});

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
