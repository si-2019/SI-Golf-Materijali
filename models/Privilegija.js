/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Privilegija', {
    idPrivilegija: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    privilegija: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'Privilegija'
  });
};
