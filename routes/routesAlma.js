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

router.get('/ObrisiDatotekuOPredmetu/:nazivDatoteke/:idPredmeta/:tipMaterijala', function(req, res){

    let naziv_datoteka = req.params.nazivDatoteke;
    let id_predmet = req.params.idPredmeta;
    let tip_materijala = req.params.tipMaterijala;

    db.Materijal.findAll({
        where:{
            idPredmet: id_predmet,
            tipMaterijala: tip_materijala
        }
    }).then(function(m){
        if(m){
            db.Datoteke.destroy({
                where:{
                    naziv: naziv_datoteka,
                    idMaterijal: m.idMaterijal
                }
            }).then(function(result){
                if(result){
                    res.json({message: 'OK' })
                }
                else{
                    res.json({ error: 'greska' })
                }
            })
        }
    })
})

module.exports = router;