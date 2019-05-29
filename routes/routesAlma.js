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
    for(let i = 1; i < 3; ++i){
        prethodne2AG.push({
            prethodna: datumPocetkaAG.getYear() - i
        })
    }
    res.json({getAkademskaGodina:prethodne2AG})
    )}.catch(function(err){
        res.json({message: 'error'})
    })
})

module.exports = router;