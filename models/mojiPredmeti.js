/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mojiPredmeti', {
    idKorisnik: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      }
    },
    idPredmet: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Predmet',
        key: 'id'
      }
    }
  }, {
    tableName: 'mojiPredmeti'
  });
};
