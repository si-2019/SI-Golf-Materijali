const express = require('express')
const router = express.Router()
const db = require('../models/db.js')

router.get('/', function(req,res){
    res.send('Samira')
})

router.get('/uloga/:idKorisnik', function (req,res){

    let idKorisnik = req.params.idKorisnik;
    db.korisnik.findOne({
        attributes: ['idUloga'], 
        where: {
            id: idKorisnik
        }
    }).then(function(k){
        db.uloga.findOne({
            attributes: ['naziv'], 
            where: {
                id: k.idUloga
            }
        }).then(function(u){
            let odg = {uloga: u.naziv}
            res.json(odg)
        }).catch(function(err){
            let greska = {error: "error"}
            res.json(greska)
        })
    }).catch(function(err){
        let greska = {error: "error"}
        res.json(greska)
    })
})

router.get('/mojiPredmeti/:idKorisnik', function(req,res){

    let idKorisnik = req.params.idKorisnik
    let uloga = req.query.uloga

    if(uloga == 'PROFESOR'){
        db.predmet.findAll({
            where: {
                idProfesor: idKorisnik
            }
        }).then(function(predmeti){
            let resPredmeti = predmeti.map(p => {
                return {
                    id: p.id,
                    naziv: p.naziv,
                    opis: p.opis
                }
            })
            res.json({predmeti: resPredmeti})
        }).catch(function(err){
            let greska = {error: "error"}
            res.json(greska)
        })
    }
    else if(uloga=='ASISTENT'){
        db.predmet.findAll({
            where: {
                idAsistent: idKorisnik
            }
        }).then(function(predmeti){
            let resPredmeti = predmeti.map(p => {
                return {
                    id: p.id,
                    naziv: p.naziv,
                    opis: p.opis
                }
            })
            res.json({predmeti: resPredmeti})
        }).catch(function(err){
            let greska = {error: "error"}
            res.json(greska)
        })
    }
    else if(uloga=='STUDENT'){
        let predmeti = []
        db.mojiPredmeti.findAll({
            attributes: ['idKorisnik','idPredmet'],
            where: {
                idKorisnik: idKorisnik
            }
        }).then(function(korisnici){

            let promises = []
           for(let i=0 ; i<korisnici.length ; i++){
                let noviPromise = db.predmet.findOne({
                    attributes: ['id','naziv','opis'],
                    where: {
                        id: korisnici[i].idPredmet
                    }
                })
                promises.push(noviPromise)
            }
            Promise.all(promises).then(function(pred){
                for(let i=0 ; i<pred.length ; i++){
                    predmeti.push({id:pred[i].id,naziv:pred[i].naziv,opis:pred[i].opis});
                    if(i==pred.length-1){
                        res.json({predmeti:predmeti})
                    }
                }
            })
        })
    }
    else{
        let predmeti = []
        res.json({predmeti: predmeti})          
    }
})

router.get('/predmeti/:ciklus/:odsjek/:semestar', function(req,res){

    let ciklus = req.params.ciklus
    let semestar = req.params.semestar
    let odsjek = req.params.odsjek

    let niz = [0,0,3,5]
    let godina = Math.ceil(niz[parseInt(ciklus)]+parseInt(semestar)/2)

    if(semestar%2==0){
        semestar=2
    }
    else {
        semestar=1
    }

    let predmeti=[]

    db.odsjek.findOne({
        attributes: ['idOdsjek'], 
        where: {
            naziv:odsjek
        }
    }).then(function(o){
        if(o!=null){
            db.odsjek_predmet.findAll({
                attributes: ['idPredmet'],
                where: {
                    idOdsjek: o.idOdsjek,
                    semestar: semestar,
                    godina: godina
                }
            }).then(function(p){
                if(p.length==0){
                    res.json({predmeti: predmeti})
                }
                let promises = []
                for(let i = 0 ; i<p.length ; i++){
                    let noviPromise = db.predmet.findOne({
                        attributes: ['id','naziv','opis'], 
                        where: {
                            id: p[i].idPredmet
                        }
                    })
                    promises.push(noviPromise)
                }
                Promise.all(promises).then(function(pred){
                    for(let i=0 ; i<pred.length ; i++){
                        predmeti.push({id:pred[i].id,naziv:pred[i].naziv,opis:pred[i].opis});
                        if(i==pred.length-1){
                            res.json({predmeti:predmeti})
                        }
                    }
                })
            }).catch(function(err){
                res.json({predmeti: predmeti})
            })
        }
        else{                               
            res.json({predmeti: predmeti})
        }
    }).catch(function(err){
        res.json({predmeti: predmeti})
    })
})


module.exports = router;