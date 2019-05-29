const express = require('express');
const router = express.Router();
const db = require('../models/db.js');

router.get('/',function(req,res){
    res.send('Alma');
});

router.get('/getAkademskaGodina/', function(req, res){

    let datumPocetkaAG;
    db.akademskaGodina.findOne({
        where: {
            aktuelna: '1'
        }
    }).then(function(ag){

        datumPocetkaAG = new Date(ag.pocetak.zimskog_semestra)
    }
    let prethodne2AG = []
    for(let i = 0; i < 2; ++i){
        prethodne2AG.push({
            prviDioAk: datumPocetkaAG.getYear() - i,
            drugiDioAk: datumPocetkaAG.getYear() - i - 1
        })
    }
    res.json({getAkademskaGodina:prethodne2AG})
    )}.catch(function(err){
        res.json({message: 'error'})
    })
})

module.exports = router;