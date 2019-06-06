const express = require('express');
const router = express.Router();
const db = require('../models/db.js');

router.get('/',function(req,res){
    res.send('Alma');
});

router.get('/getAkademskaGodina', function(req, res){

    let datumPocetkaAG;
    let datumKrajaAG;
    db.akademskaGodina.findAll({
        limit: 3,
        order: [
            ['pocetak_zimskog_semestra','DESC']
        ],
    }).then(function(ag){
        let godine = []
        for(let i=0; i<ag.length; i++){
            godine.push(ag[i].naziv)
        }
       res.json({godine:godine})
    }).catch(function(err){
        res.json({message: err})
    })
})

router.get('/ObrisiDatoteku/:nazivDatoteke/:idMaterijala', function(req, res){

    let naziv_datoteka = req.params.nazivDatoteke;
    let id_materijal = req.params.idMaterijala;

    db.Datoteke.destroy({
        where:{ naziv: naziv_datoteka, idMaterijal: id_materijal }
    }).then(result => {
        let odgovor = { obrisano: 200 }
        res.end(JSON.stringify(odgovor));
    })
})

module.exports = router;