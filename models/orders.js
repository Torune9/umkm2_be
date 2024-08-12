'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init({
    username : DataTypes.STRING,
    name: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    order_id: DataTypes.STRING,
    email: DataTypes.STRING,
    token: DataTypes.STRING,
    status : DataTypes.STRING,
    total : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};