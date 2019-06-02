const express = require('express')
const moment = require('moment')
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
            }
            res.json({predmeti:predmeti})
        })
    })
})

router.get('/dajPredmeteZaNastavniAnsambl/:idKorisnika', function(req, res){

    let idKorisnika = req.params.idKorisnika
    let uloga = req.query.uloga

    if(uloga=='PROFESOR'){
        db.predmet.findAll({
            where: {
                idProfesor: idKorisnika
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
    else if (uloga=='ASISTENT'){
        db.predmet.findAll({
            where: {
                idAsistent: idKorisnika
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
    else{
        res.json({
            predmeti: []
        })
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
                    return
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
                    }
                    res.json({predmeti:predmeti})
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

router.post('/dodajMojPredmet/:idKorisnika/:idPredmeta', function(req, res){

    let idKorisnika = req.params.idKorisnika
    let idPredmeta = req.params.idPredmeta

    db.predmet.findOne({
        where: {
            id:idPredmeta
        }
    }).then(function(pred){
        if(pred){
            db.korisnik.findOne({
                where: {
                    id: idKorisnika
                }
            }).then(function(kor){
                if(kor){
                    kor.addPredmeti(pred)
                    res.json({message:'OK'})
                }
                else{
                    res.json({error:'greska'})
                }
            })
        }
        else{
            res.json({error:'greska'})
        }
    })
})

router.get('/sedmice/:semestar', function(req, res){
    
    let semestar = parseInt(req.params.semestar)
    let datumPocetka;
    db.akademskaGodina.findOne({
        where: {
            aktuelna: '1'
        }
    }).then(function(ag){
        if(semestar%2 == 0){
            datumPocetka = new Date(ag.pocetak_ljetnog_semestra)
        }
        else{
            datumPocetka = new Date(ag.pocetak_zimskog_semestra)
        }
        let sedmice = []
        for (let i=0; i<16; i++){
            sedmice.push({
                pocetakSedmice: moment(datumPocetka).startOf('week').add(1+i*7,'days').format('DD.MM.YYYY'),
                krajSedmice: moment(datumPocetka).startOf('week').add(7+i*7,'days').format('DD.MM.YYYY'),
                redniBrojSedmice: i + 1
            })
        }
        res.json({sedmice:sedmice})
    }).catch(function(err){
        res.json({message:'error'})
    })
})

router.get('/semestar/:idPredmeta', function(req,res){

    let idPredmeta = req.params.idPredmeta

    db.odsjek_predmet.findOne({
        attributes: ['semestar'],
        where:{
            idPredmet: idPredmeta
        }
    }).then(function(red){
        res.json({semestar: red.semestar})
    }).catch(function(err){
        res.json({message: 'error'})
    })
})

router.get('/nazivTrenutneAkademskeGodine', function(req,res){
    db.akademskaGodina.findOne({
        where:{
            aktuelna: '1'
        },
        attributes: ['naziv']
    }).then(function(ag){
        res.json({naziv:ag.naziv})
    }).catch(function(err){
        res.json({message:'error'})
    })
})

module.exports = router;