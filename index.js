var express = require('express')
var app = express()
var mysql = require('mysql');
const db = require('./models/db');
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
var PORT = process.env.PORT || 31907;

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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


app.listen(PORT,function(){ console.log('server successfully started on port '+PORT); });

module.exports = app;
