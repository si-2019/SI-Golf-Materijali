/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IssueCategory', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    naziv: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'IssueCategory'
  });
};
