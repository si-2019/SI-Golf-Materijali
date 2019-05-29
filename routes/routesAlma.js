const express = require('express');
const router = express.Router();
const db = require('../models/db.js');

router.get('/',function(req,res){
    res.send('Alma');
});

router.get('/getAkademskaGodina/', function(req, res){

    let datumPocetkaAG;
    let datumKrajaAG;
    db.akademskaGodina.findOne({
        where: {
            aktuelna: '1'
        }
    }).then(function(ag){

        datumPocetkaAG = new Date(ag.pocetak_zimskog_semestra);
        datumKrajaAG = new Date(ag.kraj_ljetnog_semestra);
    let prethodne2AG = [];   
        
        prethodne2AG.push({
            prviDioAk: datumPocetkaAG.getFullYear() - 1,
            drugiDioAk: datumKrajaAG.getFullYear() - 1
        });
        
    res.json({prethodne2AG:prethodne2AG});
    }).catch(function(err){
        res.json({message: err})
    })
})

module.exports = router;