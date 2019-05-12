/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ChatDatoteke', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    naziv: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },
    posiljaoc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    soba: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mimetype: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    file: {
      type: "BLOB",
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'ChatDatoteke'
  });
};
