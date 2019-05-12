var express = require('express')
var app = express()
var mysql = require('mysql');
const db = require('./models/db');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


db.sequelize.sync().then(function(){
    console.log("Uspjesno povezano");
}).catch(function(err){
    console.log("Neuspjesno povezivanje");
    console.log(err);
});

app.get('/', function(req, res) {
    res.send('GOLF')
})

app.listen(31907, function() {
    console.log("Pokrenuto na portu 31907")
});

module.exports = app;
