const express = require('express');
const router = express.Router();
const db = require('../models/db.js');

router.get('/',function(req,res){
    res.send('Irma');
});

router.get('/dajNaziv/:idPredmeta',function(req,res){
    let idPredmeta = req.params.idPredmeta;
    
    db.predmet.findOne({
        where: {
            id: idPredmeta}
        })
        .then(function(r){ 
            if(r){
                res.json({naziv: r.naziv})
            }
            else{
                let greska = {error: "error"}
                res.status(404)
                res.json(greska)
            }
        })
        .catch(function(err){
            let greska = {error: "error"}
            res.status(400)
            res.json(greska)
        });
})

router.get('/dodajMaterijal/:idMaterijala/:idPredmeta/:idTipMaterijala/:napomena/:objavljeno/:sedmica/:idAkGod/:nazivObjave/:nazivDatoteke',function(req,res){
    let idMat=req.params.idMaterijala;
    let idPred=req.params.idPredmeta;
    let idTipMat=req.params.idTipMaterijala;
    let napomena=req.params.napomena;
    let objavljeno=req.params.objavljeno;
    let sedmica=req.params.sedmica;
    let idAkadGod=req.params.idAkGod;
    let nazivO=req.params.nazivObjave;   
    let nazivD=req.params.nazivDatoteke; 
    db.materijal.findOne({where:{idMaterijal:idMat}})
        .then((x)=>{
            x.update(
                {idTipMaterijala : idTipMat},
                {datumIzmjene : Sequelize.NOW},
                {napomena : napomena},
                {objavljeno : objavljeno},
                {sedmica : sedmica},
                {tipMaterijala : idTipMat},
                {naziv:nazivO}          
            );
        })
        .catch((err)=>{            
            res.end(err)
        });

        db.datoteke.findOne({where:{idMaterijal:idMat}})
        .then((x)=>{
            x.update(
                {naziv:nazivD}          
            );
        })
        .catch((err)=>{            
            res.end(err)
        });
})

module.exports = router;
