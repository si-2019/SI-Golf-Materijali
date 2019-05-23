const express = require('express');
const moment = require('moment');
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
});

{/*router.get('/dajLiteraturu/:idPredmet', function(req,res){
    let idPredmet = req.params.idPredmet;
    let file = [];
    db.materijal.findAll({where :{idPredmet:idPredmet, idTipMaterijala:1}}).then(function(p){
        
        for(let i = 0; i < p.length; i++) {
            //console.log(p.length);
            db.datoteke.findAll({attributes: ['naziv'],where :{idMaterijal:p[i].idMaterijal}}).then(function(q){
               // file.push(p[0].naziv);
               //console.log(p[i].idMaterijal);
               let obj = [];
               for(let j = 0; j < q.length; j++){
                   
                   obj.push(q[j].naziv);
                   //console.log(q[j].naziv);

               }
               file.push(obj);
                console.log(file);
               
            })
            res.send(JSON.stringify(file));
        }
     
      
    })
   
})*/}


router.get('/dajLiteraturu/:idPredmet', function(req, res){
    
    let idPredmet = req.params.idPredmet;
    //console.log(idPredmet)
    let file = [];
    db.materijal.findAll({where: {tipMaterijala:1, idPredmet:idPredmet}}).then(function(p){
       let promise = []
       //console.log(p.length)
       for(let i = 0; i < p.length; i++){
         //console.log(p[i].idMaterijal)
         let pomocni = []
         pomocni = db.datoteke.findOne({where :{idMaterijal:p[i].idMaterijal}})
         //console.log({ovo_je_pomocni:pomocni.naziv})
         promise.push(pomocni);
         //console.log("Usao u literetaturu")
       }
       Promise.all(promise).then(function(q){
           
           for(let i = 0; i < q.length; i++){
               file.push({naziv:q[i].naziv});
               //file.push("prvi.pdf")
               //console.log("usaoo");
           }
            //console.log(file)
           res.json({file:file})
       })
   })
})

router.get('/dajOPredmetu/:idPredmet', function(req, res){
    let idPredmet = req.params.idPredmet;
    let file = [];
   db.materijal.findAll({attributes: ['idMaterijal'], where: {idPredmet:idPredmet, tipMaterijala:1}}).then(function(p){
       let promise = []
       for(let i = 0; i < p.length; i++){
         //console.log(p[i].idMaterijal)
         let pomocni
         pomocni = db.datoteke.findOne({where :{idMaterijal:p[i].idMaterijal}})
         //console.log({ovo_je_pomocni:pomocni.naziv})
         promise.push(pomocni);
         //console.log(promise.naziv);
       }
       Promise.all(promise).then(function(q){
           
           for(let i = 0; i < q.length; i++){
               file.push({naziv:q[i].naziv});
               //file.push("prvi.pdf")
               //console.log("usaoo");
           }
            //console.log(file)
           res.json({file:file})
       })
   })
})

{/*router.get('/dajObjave/:idPredmet', function(req, res){
    let idPredmet = req.params.idPredmet
    let file =  []
    for(let i = 1; i <= 16; i++){
        db.materijal.findAll({where :{idPredmet:idPredmet, idTipMaterijala:1, sedmica:i}}).then(function(p){
            for(let j = 0; j < p.length; j++)
                console.log(p[j].idMaterijal)

            res.json({file:p})
        })
    }
})*/}



module.exports = router;