var express = require('express')
var app = express()
var mysql = require('mysql');
const db = require('./models/db');
const endpoints = require('./endpoints.js');
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


db.sequelize.sync().then(function(){
    console.log("Uspjesno povezano");
}).catch(function(err){
    console.log("Neuspjesno povezivanje");
    console.log(err);
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

endpoints(app,db);

app.get('/', function(req, res) {
    res.send('GOLF')
})

app.listen(31907, function() {
    console.log("Pokrenuto na portu 31907")
});

module.exports = app;