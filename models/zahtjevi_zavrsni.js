/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zahtjevi_zavrsni', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    idTema: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'teme_zavrsnih',
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
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'zahtjevi_zavrsni'
  });
};
