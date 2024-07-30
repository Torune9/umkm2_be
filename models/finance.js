'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class finance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  finance.init({
    income: DataTypes.STRING,
    expenditure: DataTypes.BIGINT,
    profit: DataTypes.BIGINT,
    loss: DataTypes.BIGINT,
    countdown : DataTypes.DATE,
    information : DataTypes.STRING,
    storeId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'finance',
  });
  return finance;
};