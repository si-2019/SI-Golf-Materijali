const express = require('express');
const router = express.Router();
const db = require('../models/db.js');

router.get('/',function(req,res){
    res.send('Lejla');
});
router.get('/prikaziFileOPredmetu/:idPredmeta/:nazivFile',function(req,res){
    let predmet = req.params.idPredmeta;
    let file = req.params.nazivFile;
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