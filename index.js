var express = require('express')
var app = express()

app.get('/', function(req, res) {
    res.send('GOLF')
})

app.listen(31907, function() {
    console.log("Pokrenuto na portu 31907")
})
