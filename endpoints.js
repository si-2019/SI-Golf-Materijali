const initializeEndpoints = (app,db) => {

	// POST: addMaterijal
	app.post('/addMaterijal', function(req, res){

		db.Materijal.insertOrUpdate({
			idPredmet: req.body.idPredmet,
			idTipMaterijala: req.body.idTipMaterijala,
			datumObjave: Date.now(),
			napomena: req.body.napomena,
			objavljeno: true,
			sedmica: req.body.sedmica
		}).then(function(materijal){
			if(materijal) res.send("Uspjesno unesen materijal")
		})

	})

	// GET: getMaterijal/{idPredmet}

	app.get('/getMaterijal/:idPredmet', function(req, res){
		db.Materijal.findAll({where: {idPredmet:req.params.idPredmet}}).then(function(materijali){
			res.send(JSON.stringify(materijali))
		})
	})

	// PUT: updateMaterijal/{id}
	// DELETE: deleteMaterijal/{id}

	// GET: getTipoviMaterijala

	// POST: addDatoteka
	// GET: getDatoteka/{id}
	// PUT: updateDatoteka/{id}
	// DELETE: deleteDatoteka/{id}

	//
}

module.exports = initializeEndpoints;