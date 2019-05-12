/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ObavjestenjeGlobalno', {
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
    datum: {
      type: DataTypes.DATE,
      allowNull: false
    },
    obavjestenje: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'ObavjestenjeGlobalno'
  });
};
