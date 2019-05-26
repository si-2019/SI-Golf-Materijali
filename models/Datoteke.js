/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Datoteke', {
    idDatoteke: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idMaterijal: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'Materijal',
        key: 'idmaterijal'
      }
    },
    datoteka: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    },
    naziv: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'Datoteke'
  });
};
