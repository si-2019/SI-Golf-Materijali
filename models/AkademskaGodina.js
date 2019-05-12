/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AkademskaGodina', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    naziv: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    aktuelna: {
      type: DataTypes.ENUM('0','1'),
      allowNull: false
    },
    pocetak_zimskog_semestra: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    kraj_zimskog_semestra: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    pocetak_ljetnog_semestra: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    kraj_ljetnog_semestra: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'AkademskaGodina'
  });
};
