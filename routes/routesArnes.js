const express = require('express');
const router = express.Router();
const db = require('../models/db.js');
const test = require('../testLogin.js')


router.get('/',function(req,res){
    res.send('Arnes');
});

router.get('/dajPrivilegije/:idKorisnika/:idPredmeta',function(req,res){
    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {
        let idKorisnika = req.params.idKorisnika;
        let idPredmeta = req.params.idPredmeta;
        db.predmet.findOne({where :{id:idPredmeta}}).then(function(p){ 
            if((p.idAsistent != null && p.idAsistent == idKorisnika) || (p.idProfesor != null && p.idProfesor == idKorisnika )) {  
                let odg = {privilegija:true}
            res.json(odg)
            }
            else{
                let odg = {privilegija:false}
                res.json(odg)
            }
        }).catch(function(err){
            let greska = {message: "error"}
            res.json(greska)
            console.log(err)
        });
    })
})

router.get('/dajMaterijaleZaStudenta/:idPredmet/:sedmica/:naziv', function(req,res){

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {
        let predmet = req.params.idPredmet
        let sedmica = req.params.sedmica
        let naziv = decodeURIComponent(req.params.naziv)

        db.akademskaGodina.findOne({
            attributes: ['id'],
            where: {
                naziv: naziv
            }
        }).then(function(ag){
            if(ag){
                db.materijal.findAll({
                    where: {
                        idPredmet: predmet,
                        sedmica: sedmica,
                        objavljeno: true,
                        idAkademskaGodina: ag.id,
                        tipMaterijala: 3
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
                                id:materijali[i].idMaterijal,
                                naziv:materijali[i].naziv,
                                opis: materijali[i].napomena,
                                datum: materijali[i].datumIzmjene,
                                datoteke: files
                            })
                        }
                        res.json({objave:objave})
                    })
                }).catch(function(err){
                    res.status(400)
                    res.json({error: "error"})
                    console.log(err)
                })
            }
            else{
                res.status(404)
                res.json({error: "error"})
            }
        })
    })
})


router.get('/dajMaterijaleZaProfesora/:idPredmet/:sedmica/:naziv', function(req,res){

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        let predmet = req.params.idPredmet
        let sedmica = req.params.sedmica
        let naziv = decodeURIComponent(req.params.naziv)

        db.akademskaGodina.findOne({
            attributes: ['id'],
            where: {
                naziv:naziv
            }
        }).then(function(ag){
            if(ag){
                db.materijal.findAll({
                    where: {
                        idPredmet: predmet,
                        sedmica: sedmica,
                        idAkademskaGodina: ag.id,
                        tipMaterijala: 3
                    }
                }).then(function(materijali){
                    let promises = []
                    for(let i=0; i<materijali.length; i++){
                        let noviPromise = db.datoteke.findAll({
                            attributes: ['idDatoteke','naziv'],
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
                                files.push({id: datoteke[i][j].idDatoteke,naziv: datoteke[i][j].naziv})
                            }
                            objave.push({
                                id:materijali[i].idMaterijal,
                                naziv:materijali[i].naziv,
                                opis: materijali[i].napomena,
                                datum: materijali[i].datumIzmjene,
                                objavljeno: materijali[i].objavljeno,
                                datoteke: files
                            })
                        }
                        res.json({objave:objave})
                    })
                }).catch(function(err){
                    res.status(400)
                    res.json({error: "error"})
                    console.log(err)
                })
            }
            else{
                res.status(404)
                res.json({error: "error"})
            }
        })

    })

})

router.get('/dajLiteraturuZaStudenta/:idPredmet/:naziv', function(req, res){
    
    let predmet = req.params.idPredmet
    let naziv = decodeURIComponent(req.params.naziv)

    db.akademskaGodina.findOne({
        attributes: ['id'],
        where: {
            naziv:naziv
        }
    }).then(function(ag){
        if(ag){
            db.materijal.findAll({
                where: {
                    idPredmet: predmet,
                    idAkademskaGodina: ag.id,
                    tipMaterijala: 2,
                    objavljeno: true
                }
            }).then(function(materijali){
                let promises = []
                for(let i=0; i<materijali.length; i++){
                    let noviPromise = db.datoteke.findAll({
                        attributes: ['idDatoteke','naziv'],
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
                            files.push({id: datoteke[i][j].idDatoteke,naziv: datoteke[i][j].naziv})
                        }
                        objave.push({
                            id:materijali[i].idMaterijal,
                            naziv:materijali[i].naziv,
                            opis: materijali[i].napomena,
                            datum: materijali[i].datumIzmjene,
                            objavljeno: materijali[i].objavljeno,
                            datoteke: files
                        })
                    }
                    res.json({objave:objave})
                })
            }).catch(function(err){
                res.status(400)
                res.json({error: "error"})
                console.log(err)
            })
        }
        else{
            res.status(404)
            res.json({error: "error"})
        }
    })

})

router.get('/dajLiteraturuZaProfesora/:idPredmet/:naziv', function(req, res){

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        let predmet = req.params.idPredmet
        let naziv = decodeURIComponent(req.params.naziv)

        db.akademskaGodina.findOne({
            attributes: ['id'],
            where: {
                naziv:naziv
            }
        }).then(function(ag){
            if(ag){
                db.materijal.findAll({
                    where: {
                        idPredmet: predmet,
                        idAkademskaGodina: ag.id,
                        tipMaterijala: 2
                    }
                }).then(function(materijali){
                    let promises = []
                    for(let i=0; i<materijali.length; i++){
                        let noviPromise = db.datoteke.findAll({
                            attributes: ['idDatoteke', 'naziv'],
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
                                files.push({id: datoteke[i][j].idDatoteke,naziv: datoteke[i][j].naziv})
                            }
                            objave.push({
                                id:materijali[i].idMaterijal,
                                naziv:materijali[i].naziv,
                                opis: materijali[i].napomena,
                                datum: materijali[i].datumIzmjene,
                                objavljeno: materijali[i].objavljeno,
                                datoteke: files
                            })
                        }
                        res.json({objave:objave})
                    })
                }).catch(function(err){
                    res.status(400)
                    res.json({error: "error"})
                    console.log(err)
                })
            }
            else{
                res.status(404)
                res.json({error: "error"})
            }
        })

    })

})


router.get('/dajOPredmetu/:idPredmet/:naziv', function(req, res){

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        let predmet = req.params.idPredmet
        let naziv = decodeURIComponent(req.params.naziv)

        db.akademskaGodina.findOne({
            attributes: ['id'],
            where: {
                naziv:naziv
            }
        }).then(function(ag){
            if(ag){
                db.materijal.findAll({
                    where: {
                        idPredmet: predmet,
                        idAkademskaGodina: ag.id,
                        tipMaterijala: 1,
                        objavljeno: true
                    }
                }).then(function(materijali){
                    if(materijali.length==0){
                        db.materijal.create({
                            idPredmet: predmet,
                            idTipMaterijala: 1,
                            datumObjave: Date.now(),
                            datumIzmjene: Date.now(),
                            napomena: "",
                            objavljeno: 1,
                            tipMaterijala: 1,
                            idAkademskaGodina: ag.id,
                            naziv: ""
                        }).then(function(mat){
                            let objave = []
                            objave.push({
                                id:mat.idMaterijal,
                                naziv:mat.naziv,
                                opis: mat.napomena,
                                datum: mat.datumIzmjene,
                                objavljeno: mat.objavljeno,
                                datoteke: []
                            })
                            res.json({objave:objave})
                        }).catch(function(err){
                            res.status(400)
                            res.json({error: "error"})
                            console.log(err)
                        })
                    }
                    else{
                        let promises = []
                        for(let i=0; i<materijali.length; i++){
                            let noviPromise = db.datoteke.findAll({
                                attributes: ['idDatoteke','naziv'],
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
                                    files.push({id: datoteke[i][j].idDatoteke,naziv: datoteke[i][j].naziv})
                                }
                                objave.push({
                                    id:materijali[i].idMaterijal,
                                    naziv:materijali[i].naziv,
                                    opis: materijali[i].napomena,
                                    datum: materijali[i].datumIzmjene,
                                    objavljeno: materijali[i].objavljeno,
                                    datoteke: files
                                })
                            }
                            res.json({objave:objave})
                        })
                    }   
                })
            }
            else{
                res.status(404)
                res.json({error: "error"})
            }
        })

    })
 
})




module.exports = router;