/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ZahtjeviZavrsni', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    idTema: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TemeZavrsnih',
        key: 'id'
      }
    },
    idStudent: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      }
    },
    idProfesor: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      }
    },
    odobreno: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true
    }
  }, {
    tableName: 'ZahtjeviZavrsni'
  });
};
