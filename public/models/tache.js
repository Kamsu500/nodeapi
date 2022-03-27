'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tache extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tache.belongsTo(models.User);
    }
  }
  Tache.init({
    id_tache: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'Tache',
  });
  return Tache;
};