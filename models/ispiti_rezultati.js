/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ispiti_rezultati', {
    idIspit: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Ispit',
        key: 'idispit'
      }
    },
    idStudent: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Korisnik',
        key: 'id'
      }
    },
    bodovi: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    }
  }, {
    tableName: 'ispiti_rezultati'
  });
};
