const express = require('express');
const router = express.Router();
const db = require('../models/db.js');

router.get('/',function(req,res){
    res.send('Amila');
});

router.get('/provjera/:idKorisnika/:idPredmeta',function(req,res){
   
    let idKorisnika = req.params.idKorisnika;
    let idPredmeta = req.params.idPredmeta;

    db.mojiPredmeti.findAll({attributes:['idKorisnik','idPredmet'],where:{ idKorisnik: idKorisnika, idPredmet: idPredmeta }}).then(rez => {
        if (rez[0] == null) {
            let odgovor = { veza: 0 }
            res.end(JSON.stringify(odgovor));
        }
        else {
            let odgovor = { veza: 1 }
            res.end(JSON.stringify(odgovor));
        }
    });
});




module.exports = router;