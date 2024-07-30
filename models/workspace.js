'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workspace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Store,task}) {
      this.belongsTo(Store,{
        foreignKey : 'storeId'
      })
      this.hasMany(task)
    }
  }
  workspace.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    storeId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'workspace',
  });
  return workspace;
};