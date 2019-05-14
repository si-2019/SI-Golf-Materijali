const express = require('express');
const router = express.Router();
const db = require('../models/db.js');

router.get('/',function(req,res){
    res.send('Samira');
});

router.get('/ag',function(req,res){
    db.akademskaGodina.findOne({where:{aktuelna:1}}).then(function(god){res.send(god.naziv)}).catch(function(err){res.send(err);})
});



module.exports = router;