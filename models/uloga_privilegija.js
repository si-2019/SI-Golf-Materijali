/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('uloga_privilegija', {
    idUloga: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Uloga',
        key: 'iduloga'
      }
    },
    idPrivilegija: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Privilegija',
        key: 'idprivilegija'
      }
    }
  }, {
    tableName: 'uloga_privilegija'
  });
};
