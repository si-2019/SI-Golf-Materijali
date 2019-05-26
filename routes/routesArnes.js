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


router.get('/dajMaterijaleZaStudenta/:idPredmet/:sedmica', function(req,res){

    let predmet = req.params.idPredmet
    let sedmica = req.params.sedmica

    db.akademskaGodina.findOne({
        attributes: ['id'],
        where: {
            aktuelna: '1'
        }
    }).then(function(ag){
        db.materijal.findAll({
            where: {
                idPredmet: predmet,
                sedmica: sedmica,
                objavljeno: true,
                idAkademskaGodina: ag.id
            }
        }).then(function(materijali){
            let promises = []
            for(let i=0; i<materijali.length; i++){
                let noviPromise = db.datoteke.findAll({
                    attributes: ['naziv'],
                    where:{
                        idMaterijal: materijali[i].idMaterijal
                    }
                })
                promises.push(noviPromise);
            }
            Promise.all(promises).then(function(datoteke){
                let objave = []
                for(let i=0; i<datoteke.length;i++){
                    let files = []
                    for(let j=0; j<datoteke[i].length; j++){
                        files.push(datoteke[i][j].naziv)
                    }
                    objave.push({
                        naziv:materijali[i].naziv,
                        opis: materijali[i].napomena,
                        datum: materijali[i].datumObjave,
                        datoteke: files
                    })
                }
                res.json(objave)
            })
        })
    })
})


module.exports = router;