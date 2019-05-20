const express = require('express');
const router = express.Router();
const db = require('../models/db.js');

router.get('/',function(req,res){
    res.send('Arnes');
});

router.get('/dajPrivilegije/:idKorisnika/:idPredmeta',function(req,res){
    let idKorisnika = req.params.idKorisnika;
    let idPredmeta = req.params.idPredmeta;
    db.predmet.findOne({where :{id:idPredmeta}}).then(function(p){ 
        if((p.idAsistent != null && p.idAsistent == idKorisnika) || (p.idProfesor != null && p.idProfesor == idKorisnika )) {  
            let odg = {privilegija:1}
            res.end(JSON.stringify(odg));
        }
        else{
            let odg = {privilegija:0}
            res.end(JSON.stringify(odg));
        }
    }).catch(function(err){
        let greska = {privilegija:2}
        res.end(JSON.stringify(greska))
        });
})



module.exports = router;