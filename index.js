var express = require('express')
var app = express()
var mysql = require('mysql');
const db = require('./models/db');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());


db.sequelize.sync().then(function(){
    console.log("Uspjesno povezano");
}).catch(function(err){
    console.log("Neuspjesno povezivanje");
    console.log(err);
});

const routesSamira = require('./routes/routesSamira');
const routesAsim = require('./routes/routesAsim');
const routesArnes = require('./routes/routesArnes');
const routesLejla = require('./routes/routesLejla');
const routesIrma = require('./routes/routesIrma');
const routesAmila = require('./routes/routesAmila');
const routesRamiz = require('./routes/routesRamiz');
const routesAlma = require('./routes/routesAlma');


app.use('/r1',routesSamira);
app.use('/r2',routesAsim);
app.use('/r3',routesArnes);
app.use('/r4',routesLejla);
app.use('/r5',routesIrma);
app.use('/r6',routesAmila);
app.use('/r7',routesRamiz);
app.use('/r8',routesAlma);


app.get('/', function(req, res) {
    res.send('GOLF')
})


app.listen(31907, function() {
    console.log("Pokrenuto na portu 31907")
});

module.exports = app;
