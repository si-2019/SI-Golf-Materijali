/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Issue', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    procitaoStudent: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    procitalaSS: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    issueID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'IssueCategory',
        key: 'id'
      }
    },
    StudentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Korisnik',
        key: 'id'
      }
    }
  }, {
    tableName: 'Issue'
  });
};
