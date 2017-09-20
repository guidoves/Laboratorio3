var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express(__dirname + 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.render('index.html');
});

var Personas = [
    { nombre: 'Juan', edad:20},
    { nombre: 'Ana', edad:25},
    { nombre: 'Jose', edad:21},
    { nombre: 'Valentina', edad:18}
]

app.get('/personas', function(req, res){
    res.send(JSON.stringify(Personas));
});

app.get('/agregarpersona', function(req, res){
   /*console.log('------Parametros Get Recibidos ------');
    console.log(req.query['nombre'] + ', ' + req.query['edad']);
    console.log('-------------------------------------');*/
    var persona = {};
    persona.nombre = req.query['nombre'];
    persona.edad = req.query['edad'];
    Personas.push(persona);

    
    res.send('Get Recibido');
});

app.post('/agregar', function(req, res){
    console.log('------Parametros Recibidos ------');
    console.log(req.body);
    console.log('-------------------------------------');
    res.send('Recibido');
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
