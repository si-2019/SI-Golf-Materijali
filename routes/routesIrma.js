const express = require('express');
const router = express.Router();
const db = require('../models/db.js');

router.get('/',function(req,res){
    res.send('Irma');
});

router.get('/dajNaziv/:idPredmeta',function(req,res){
    let idPredmeta = req.params.idPredmeta;
    
    db.predmet.findOne({where :{id:idPredmeta}})
        .then(function(r){ 
            
            res.end(JSON.stringify(r));
        })
        .catch(function(err){
            let greska = {privilegija:2}
            res.end(JSON.stringify(greska))
        });
})


module.exports = router;
