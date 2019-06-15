const express = require('express');
const router = express.Router();
const db = require('../models/db.js');
var fs = require("fs");
const test = require('../testLogin.js')


router.get('/', function (req, res) {
    res.send('Amila');
});

router.get('/provjera/:idKorisnika/:idPredmeta', function (req, res) {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        let idKorisnika = req.params.idKorisnika;
        let idPredmeta = req.params.idPredmeta;

        db.mojiPredmeti.findAll({
            attributes: ['idKorisnik', 'idPredmet'],
            where: {
                idKorisnik: idKorisnika,
                idPredmet: idPredmeta
            }
        }).then(rez => {
            if (rez[0] == null) {
                let odgovor = { veza: 0 }
                res.end(JSON.stringify(odgovor));
            }
            else {
                let odgovor = { veza: 1 }
                res.end(JSON.stringify(odgovor));
            }
        }).catch(function (err) {
            res.status(400)
            res.json({ error: "error" })
        })
    })
})

router.get('/obrisi/:idKorisnika/:idPredmeta', function (req, res) {

    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {

        let idKorisnika = req.params.idKorisnika;
        let idPredmeta = req.params.idPredmeta;

        db.mojiPredmeti.destroy({
            where: {
                idKorisnik: idKorisnika,
                idPredmet: idPredmeta
            }
        }).then(rez => {
            if (rez) {
                let odgovor = { message: "OK" }
                res.json(odgovor)
            }
            else {
                res.status(404)
                res.json({ error: "error" })
            }
        })
    })
})

router.get('/prikaziFileOPredmetu/:idPredmeta/:nazivFile', function (req, res) {
    test(req.query.usernameGolf, req.header('Authorization'), req, res, (req, res) => {
        let predmet = req.params.idPredmeta;
        let file = req.params.nazivFile;
        db.materijal.findAll({ where: { idPredmet: predmet, objavljeno: 1 } })
            .then((result) => {
                result.map((z) => {
                    db.datoteke.findOne({ where: { idMaterijal: z.idMaterijal, naziv: file } })
                        .then((rez) => {
                            fs.writeFileSync(__dirname + "/fajlovi/" + rez.naziv, rez.datoteka, function (err) { });
                            let file = __dirname + '/fajlovi/' + rez.naziv;
                            res.download(file);
                        })
                })

            })

    })

});

module.exports = router;
