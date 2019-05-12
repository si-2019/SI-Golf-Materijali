/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ObavjestenjePredmet', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    idKorisnik: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      }
    },
    idPredmet: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Predmet',
        key: 'id'
      }
    },
    datum: {
      type: DataTypes.DATE,
      allowNull: false
    },
    obavjestenje: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'ObavjestenjePredmet'
  });
};
