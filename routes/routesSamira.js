const express = require('express')
const moment = require('moment')
const fs = require('fs')
const router = express.Router()
const db = require('../models/db.js')
const multer = require('multer')
const test = require('../testLogin.js')


router.get('/', function (req, res) {
    res.send('Samira')
})

router.get('/uloga/:idKorisnik', function (req, res) {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {


        let idKorisnik = req.params.idKorisnik;

        db.korisnik.findOne({
            attributes: ['idUloga'],
            where: {
                id: idKorisnik
            }
        }).then(function (k) {
            if (k) {
                db.uloga.findOne({
                    attributes: ['naziv'],
                    where: {
                        idUloga: k.idUloga
                    }
                }).then(function (u) {
                    let odg = { uloga: u.naziv }
                    res.json(odg)
                }).catch(function (err) {
                    let greska = { error: "error" }
                    console.log(err)
                    res.status(400)
                    res.json(greska)
                })
            }
            else {
                res.status(400)
                res.json({ error: "error" })
            }
        }).catch(function (err) {
            let greska = { error: "error" }
            console.log(err)
            res.status(400)
            res.json(greska)
        })
    })
})

router.get('/mojiPredmeti/:idKorisnik', function (req, res) {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        let idKorisnik = req.params.idKorisnik

        let predmeti = []
        db.mojiPredmeti.findAll({
            attributes: ['idKorisnik', 'idPredmet'],
            where: {
                idKorisnik: idKorisnik
            }
        }).then(function (korisnici) {

            let promises = []
            for (let i = 0; i < korisnici.length; i++) {
                let noviPromise = db.predmet.findOne({
                    attributes: ['id', 'naziv', 'opis'],
                    where: {
                        id: korisnici[i].idPredmet
                    }
                })
                promises.push(noviPromise)
            }
            Promise.all(promises).then(function (pred) {
                for (let i = 0; i < pred.length; i++) {
                    predmeti.push({ id: pred[i].id, naziv: pred[i].naziv, opis: pred[i].opis });
                }
                res.json({ predmeti: predmeti })
            })
        }).catch(function (err) {
            let greska = { error: "error" }
            console.log(err)
            res.status(400)
            res.json(greska)
        })
    })
})

router.get('/dajPredmeteZaNastavniAnsambl/:idKorisnika', function (req, res) {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {


        let idKorisnika = req.params.idKorisnika
        let uloga = req.query.uloga

        if (uloga == 'PROFESOR') {
            db.predmet.findAll({
                where: {
                    idProfesor: idKorisnika
                }
            }).then(function (predmeti) {
                let resPredmeti = predmeti.map(p => {
                    return {
                        id: p.id,
                        naziv: p.naziv,
                        opis: p.opis
                    }
                })
                res.json({ predmeti: resPredmeti })
            }).catch(function (err) {
                let greska = { error: "error" }
                console.log(err)
                res.status(400)
                res.json(greska)
            })
        }
        else if (uloga == 'ASISTENT') {
            db.predmet.findAll({
                where: {
                    idAsistent: idKorisnika
                }
            }).then(function (predmeti) {
                let resPredmeti = predmeti.map(p => {
                    return {
                        id: p.id,
                        naziv: p.naziv,
                        opis: p.opis
                    }
                })
                res.json({ predmeti: resPredmeti })
            }).catch(function (err) {
                let greska = { error: "error" }
                console.log(err)
                res.status(400)
                res.json(greska)
            })
        }
        else {
            res.json({
                predmeti: []
            })
        }
    })
})

router.get('/predmeti/:ciklus/:odsjek/:semestar', function (req, res) {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        let ciklus = req.params.ciklus
        let semestar = req.params.semestar
        let odsjek = req.params.odsjek

        let niz = [0, 0, 3, 5]
        let godina = Math.ceil(niz[parseInt(ciklus)] + parseInt(semestar) / 2)

        if (semestar % 2 == 0) {
            semestar = 2
        }
        else {
            semestar = 1
        }

        let predmeti = []

        db.odsjek.findOne({
            attributes: ['idOdsjek'],
            where: {
                naziv: odsjek
            }
        }).then(function (o) {
            if (o != null) {
                db.odsjek_predmet.findAll({
                    attributes: ['idPredmet'],
                    where: {
                        idOdsjek: o.idOdsjek,
                        semestar: semestar,
                        godina: godina
                    }
                }).then(function (p) {
                    if (p.length == 0) {
                        res.json({ predmeti: predmeti })
                        return
                    }
                    let promises = []
                    for (let i = 0; i < p.length; i++) {
                        let noviPromise = db.predmet.findOne({
                            attributes: ['id', 'naziv', 'opis'],
                            where: {
                                id: p[i].idPredmet
                            }
                        })
                        promises.push(noviPromise)
                    }
                    Promise.all(promises).then(function (pred) {
                        for (let i = 0; i < pred.length; i++) {
                            predmeti.push({ id: pred[i].id, naziv: pred[i].naziv, opis: pred[i].opis });
                        }
                        res.json({ predmeti: predmeti })
                    })
                }).catch(function (err) {
                    let greska = { error: "error" }
                    console.log(err)
                    res.status(400)
                    res.json(greska)
                })
            }
            else {
                let greska = { error: "error" }
                console.log(err)
                res.status(404)
                res.json(greska)
            }
        }).catch(function (err) {
            let greska = { error: "error" }
            console.log(err)
            res.status(400)
            res.json(greska)
        })
    })
})

router.post('/dodajMojPredmet/:idKorisnika/:idPredmeta', function (req, res) {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        let idKorisnika = req.params.idKorisnika
        let idPredmeta = req.params.idPredmeta

        db.predmet.findOne({
            where: {
                id: idPredmeta
            }
        }).then(function (pred) {
            if (pred) {
                db.korisnik.findOne({
                    where: {
                        id: idKorisnika
                    }
                }).then(function (kor) {
                    if (kor) {
                        kor.addPredmeti(pred)
                        res.json({ message: 'OK' })
                    }
                    else {
                        res.status(404)
                        res.json({ error: "error" })
                    }
                }).catch(function (err) {
                    let greska = { error: "error" }
                    console.log(err)
                    res.status(400)
                    res.json(greska)
                })
            }
            else {
                res.status(404)
                res.json({ error: "error" })
            }
        }).catch(function (err) {
            let greska = { error: "error" }
            console.log(err)
            res.status(400)
            res.json(greska)
        })
    })
})

router.get('/sedmice/:semestar/:naziv', function (req, res) {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        let semestar = parseInt(req.params.semestar)
        let naziv = decodeURIComponent(req.params.naziv)
        let datumPocetka;
        db.akademskaGodina.findOne({
            where: {
                naziv: naziv
            }
        }).then(function (ag) {
            if (ag) {
                if (semestar % 2 == 0) {
                    datumPocetka = new Date(ag.pocetak_ljetnog_semestra)
                }
                else {
                    datumPocetka = new Date(ag.pocetak_zimskog_semestra)
                }
                let sedmice = []
                for (let i = 0; i < 16; i++) {
                    sedmice.push({
                        pocetakSedmice: moment(datumPocetka).startOf('week').add(1 + i * 7, 'days').format('DD.MM.YYYY'),
                        krajSedmice: moment(datumPocetka).startOf('week').add(7 + i * 7, 'days').format('DD.MM.YYYY'),
                        redniBrojSedmice: i + 1
                    })
                }
                res.json({ sedmice: sedmice })
            }
            else {
                res.status(404)
                res.json({ error: "error" })
            }
        }).catch(function (err) {
            let greska = { error: "error" }
            console.log(err)
            res.status(400)
            res.json(greska)
        })
    })
})

router.get('/semestar/:idPredmeta', function (req, res) {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        let idPredmeta = req.params.idPredmeta

        db.odsjek_predmet.findOne({
            attributes: ['semestar'],
            where: {
                idPredmet: idPredmeta
            }
        }).then(function (red) {
            res.json({ semestar: red.semestar })
        }).catch(function (err) {
            let greska = { error: "error" }
            console.log(err)
            res.status(400)
            res.json(greska)
        })
    })
})

router.get('/nazivTrenutneAkademskeGodine', function (req, res) {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        db.akademskaGodina.findOne({
            where: {
                aktuelna: '1'
            },
            attributes: ['id', 'naziv']
        }).then(function (ag) {
            res.json({ id: ag.id, naziv: ag.naziv })
        }).catch(function (err) {
            let greska = { error: "error" }
            console.log(err)
            res.status(400)
            res.json(greska)
        })

    })
})

router.delete('/obrisiMaterijal/:predmet/:materijal', function (req, res) {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        let idPredmeta = req.params.predmet
        let idMaterijala = req.params.materijal

        let promises = []
        let promis = db.materijal.destroy({
            where: {
                idPredmet: idPredmeta,
                idMaterijal: idMaterijala
            }
        }
        )
        promises.push(promis)
        let promis2 = db.datoteke.destroy({
            where: {
                idMaterijal: idMaterijala
            }
        })
        promises.push(promis2)
        Promise.all(promises).then(function (rez) {
            let odgovor = { message: "OK" }
            res.json(odgovor)
        })
    })

})

router.get('/dajFile', (req, res) => {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        db.datoteke.findOne({
            where: {
                idDatoteke: req.query.id
            }
        }).then(fajl => {
            fs.writeFileSync('./downloads/' + fajl.naziv, fajl.datoteka)
            res.download('./downloads/' + fajl.naziv)
        }).catch(error => {
            let greska = { error: "error" }
            console.log(err)
            res.status(400)
            res.json(greska)
        })
    })
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },

})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        return cb(null, true)
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
}).any()

router.post('/dodajMaterijal', function (req, res) {
    upload(req, res, function (err) {
        test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {
            let promises = []
            db.materijal.create({
                idPredmet: req.body.idPredmet,
                idTipMaterijala: req.body.idTipMaterijala,
                datumObjave: Date.now(),
                datumIzmjene: Date.now(),
                napomena: req.body.napomena,
                objavljeno: req.body.objavljeno,
                sedmica: req.body.sedmica,
                tipMaterijala: req.body.idTipMaterijala,
                idAkademskaGodina: req.body.idAkademskaGodina,
                naziv: req.body.naziv
            }).then(function (mat) {
                for (let i = 0; i < req.files.length; i++) {
                    let file = fs.readFileSync('./uploads/' + req.files[i].originalname)
                    let noviPromise = db.datoteke.create({
                        datoteka: file,
                        naziv: req.files[i].originalname,
                        idMaterijal: mat.idMaterijal
                    })
                    promises.push(noviPromise)
                }
                Promise.all(promises).then(function (rez) {
                    let fajlovi = []
                    for (let i = 0; i < rez.length; i++) {
                        fajlovi.push({ id: rez[i].idDatoteke, naziv: rez[i].naziv })
                    }
                    let odgovor = {
                        id: mat.idMaterijal,
                        naziv: mat.naziv,
                        opis: mat.napomena,
                        datum: mat.datumIzmjene,
                        objavljeno: mat.objavljeno,
                        datoteke: fajlovi
                    }
                    res.json({ objava: odgovor })
                })
            }).catch(function (err) {
                let greska = { error: "error" }
                console.log(err)
                res.status(400)
                res.json(greska)
            })
        })
    })
})

router.post('/updateMaterijal', function (req, res) {

    upload(req, res, function (err) {
        test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

            let promises = []
            db.materijal.update({
                datumIzmjene: Date.now(),
                napomena: req.body.napomena,
                objavljeno: req.body.objavljeno,
                naziv: req.body.naziv
            },
                {
                    where: {
                        idMaterijal: req.body.idMaterijal
                    }
                }).then(function (rez) {
                    if (rez) {
                        db.materijal.findOne({
                            where: {
                                idMaterijal: req.body.idMaterijal
                            }
                        }).then(function (mat) {
                            if (mat) {
                                for (let i = 0; i < req.files.length; i++) {
                                    let file = fs.readFileSync('./uploads/' + req.files[i].originalname)
                                    let noviPromise = db.datoteke.create({
                                        datoteka: file,
                                        naziv: req.files[i].originalname,
                                        idMaterijal: mat.idMaterijal
                                    })
                                    promises.push(noviPromise)
                                }
                                Promise.all(promises).then(function (rezz) {
                                    let fajlovi = []
                                    db.datoteke.findAll({
                                        where: {
                                            idMaterijal: mat.idMaterijal
                                        }
                                    }).then(function (rez) {
                                        for (let i = 0; i < rez.length; i++) {
                                            fajlovi.push({ id: rez[i].idDatoteke, naziv: rez[i].naziv })
                                        }
                                        let odgovor = {
                                            id: mat.idMaterijal,
                                            naziv: mat.naziv,
                                            opis: mat.napomena,
                                            datum: mat.datumIzmjene,
                                            objavljeno: mat.objavljeno,
                                            datoteke: fajlovi
                                        }
                                        res.json({ objava: odgovor })
                                    }).catch(function (err) {
                                        let greska = { error: "error" }
                                        console.log(err)
                                        res.status(400)
                                        res.json(greska)
                                    })

                                }).catch(function (err) {
                                    let greska = { error: "error" }
                                    console.log(err)
                                    res.status(400)
                                    res.json(greska)
                                })
                            }
                            else {
                                let greska = { error: "error" }
                                res.status(404)
                                res.json(greska)
                            }
                        }).catch(function (err) {
                            let greska = { error: "error" }
                            console.log(err)
                            res.status(400)
                            res.json(greska)
                        })
                    }
                    else {
                        let greska = { error: "error" }
                        res.status(404)
                        res.json(greska)
                    }
                })
        })
    })
})

router.delete('/obrisiFile/:file', function (req, res) {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {
        let idFile = req.params.file
        db.datoteke.destroy({
            where: {
                idDatoteke: idFile
            }
        }).then(function (rez) {
            if (rez) {
                res.json({ message: "OK" })
            }
            else {
                let greska = { error: "error" }
                res.status(404)
                res.json(greska)
            }
        }).catch(function (err) {
            let greska = { error: "error" }
            console.log(err)
            res.status(400)
            res.json(greska)
        })
    })
})

router.get('/mozePristupiti/:naziv', function (req, res) {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        let naziv = decodeURIComponent(req.params.naziv)
        db.akademskaGodina.findAll({
            limit: 3,
            order: [
                ['pocetak_zimskog_semestra', 'DESC']
            ],
        }).then(function (ag) {
            let flag = false
            for (let i = 0; i < ag.length; i++) {
                if (ag[i].naziv == naziv) {
                    flag = true
                    res.json({ uredjivanje: "true" })
                }
            }
            if (!flag) {
                res.json({ uredjivanje: "false" })
            }
        }).catch(function (err) {
            res.status(400)
            res.json({ message: "error" })
            console.log(err)
        })
    })
})


module.exports = router;