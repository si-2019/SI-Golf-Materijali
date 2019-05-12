const Sequelize = require("sequelize");
const sequelize = new Sequelize("TYQcLL35gV","TYQcLL35gV","BLysSj9ZrP",{host:'37.59.55.185',dialect:"mysql",logging:false,  port: 3306,define: {
        timestamps: false
    }
});

const db = {}

db.Sequelize = Sequelize;  
db.sequelize = sequelize;


db.materijal = sequelize.import(__dirname+'/Materijal.js');
db.tipoviMaterijala = sequelize.import(__dirname+'/TipoviMaterijala.js');
db.datoteke = sequelize.import(__dirname+'/Datoteke.js');
db.predmet = sequelize.import(__dirname+'/Predmet.js');
db.akademskaGodina = sequelize.import(__dirname+'/AkademskaGodina.js');

module.exports = db;

