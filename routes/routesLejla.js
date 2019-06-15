const express = require('express');
const router = express.Router();
const db = require('../models/db.js');
var fs = require("fs"); 
const test = require('../testLogin.js')

router.get('/',function(req,res){
    res.send('Lejla');
});
router.get('/prikaziFileOPredmetu/:idPredmeta/:nazivFile',function(req,res){
    let predmet = req.params.idPredmeta;
    let file = req.params.nazivFile;
    db.materijal.findAll({where:{idPredmet:predmet, objavljeno:1}})
        .then((result)=>{
            result.map((z)=>{
                db.datoteke.findOne({where:{idMaterijal:z.idMaterijal,naziv:file}})
                    .then((rez)=>{
                        fs.writeFileSync(__dirname + "/fajlovi/" + rez.naziv , rez.datoteka, function (err) { });
                        let file = __dirname + '/fajlovi/'+rez.naziv;
                        res.download(file);
                    })
            })
        
        })

});
router.get('/dajOPredmetuPrethodna/:idPredmet/:idGodina', function(req, res){
    let idPredmet = req.params.idPredmet;
    let godina=req.params.idGodina;
    if(godina=='2017')godina=godina+'/18';
    else if(godina=='2016')godina=godina+'/17';
    let file = [];
    db.akademskaGodina.findOne({where:{naziv:godina}}).then(function(y){
   db.materijal.findAll({where: {idPredmet:idPredmet, tipMaterijala:1,idMaterijal:y.id}}).then(function(p){
       let promise = []
       for(let i = 0; i < p.length; i++){
         let pomocni
         pomocni = db.datoteke.findOne({where :{idMaterijal:p[i].idMaterijal}})
         promise.push(pomocni);
         
       }
       Promise.all(promise).then(function(q){
           
           for(let i = 0; i < q.length; i++){
               file.push({naziv:q[i].naziv});
              
           }
            
           res.json({file:file})
       })
    })

})
})
router.get('/dajLiteraturuPrethodna/:idPredmet/:idGodina', function(req, res){
    
    let idPredmet = req.params.idPredmet;
    let godina=req.params.idGodina;
    if(godina=='2017')godina=godina+'/18';
    else if(godina=='2016')godina=godina+'/17';
    let file = [];
    db.akademskaGodina.findOne({where:{naziv:godina}}).then(function(y){
   db.materijal.findAll({where: {idPredmet:idPredmet, tipMaterijala:2,idMaterijal:y.id}}).then(function(p){
       let promise = []
       for(let i = 0; i < p.length; i++){
         let pomocni
         pomocni = db.datoteke.findOne({where :{idMaterijal:p[i].idMaterijal}})
         promise.push(pomocni);
         
       }
       Promise.all(promise).then(function(q){
           
           for(let i = 0; i < q.length; i++){
               file.push({naziv:q[i].naziv});
              
           }
            
           res.json({file:file})
       })
   })
})
})
router.get('/dajMaterijaleZaProfesora/:idPredmet/:idGodina/:sedmica', function(req,res){
    
    let predmet = req.params.idPredmet
    let sedmica = req.params.sedmica
    let godina=req.params.idGodina
    if(godina=='2017')godina=godina+'/18';
    else if(godina=='2016')godina=godina+'/17';
    db.akademskaGodina.findOne({
      where:{naziv:godina}
    }).then(function(ag){
        db.materijal.findAll({
            where: {
                idPredmet: predmet,
                sedmica: sedmica,
                idAkademskaGodina: ag.id
            }
        }).then(function(materijali){
            let promises = []
            for(let i=0; i<materijali.length; i++){
                let noviPromise = db.datoteke.findAll({
                  
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
                        objavljeno: materijali[i].objavljeno,
                        datoteke: files
                    })
                }
                res.json({objave:objave})
            })
        })
    })
})

module.exports = router;
