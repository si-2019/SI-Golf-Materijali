/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teme_zavrsnih', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    naziv: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    idProfesora: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      }
    }
  }, {
    tableName: 'teme_zavrsnih'
  });
};
