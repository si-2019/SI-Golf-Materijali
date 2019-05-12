/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FrequentIssue', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    naziv: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tekst: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'FrequentIssue'
  });
};
