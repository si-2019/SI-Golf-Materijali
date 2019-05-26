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

router.get('/obrisi/:idKorisnika/:idPredmeta',function(req,res){
    
    let idKorisnika = req.params.idKorisnika;
    let idPredmeta = req.params.idPredmeta;

    db.mojiPredmeti.destroy({
        where: { idKorisnik: idKorisnika, idPredmet: idPredmeta }
      }).then(rez => {
          let odgovor = { obrisano: 1 }
          res.end(JSON.stringify(odgovor));
    });

});

router.get('/skiniFileOPredmetu/:idPredmeta/:nazivFila',function(req,res){
    let predmet = req.params.idPredmeta;
    let file = req.params.nazivFila;
    db.materijal.findAll({where:{idPredmet:predmet, objavljeno:1}})
        .then((result)=>{
            //console.log(result);
            result.map((z)=>{
                db.datoteke.findOne({where:{idMaterijal:z.idMaterijal,naziv:file}})
                    .then((rez)=>{
                        console.log(rez);
                        
                        fs.writeFileSync(__dirname + "/fajlovi/" + rez.naziv , rez.datoteka, function (err) { });
                        let file = __dirname + '/fajlovi/'+rez.naziv;
                        res.download(file);
                    })
            })
        
        })

});



module.exports = router;