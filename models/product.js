'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Store}) {
      this.belongsTo(Store,{
        foreignKey : 'storeId',
      })
    }
  }
  product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    information: DataTypes.STRING,
    img: DataTypes.STRING,
    storeId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};