'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({workspace,user,product}) {
      this.hasMany(workspace,{
        foreignKey : 'storeId'
      })

      this.belongsTo(user,{
        foreignKey : 'userId',
        as : 'owned_store'
      })

      this.hasMany(user,{
        as : 'employees',
        sourceKey: 'id',
        foreignKey : 'member_id',
      })
      this.hasMany(product,{ foreignKey: 'storeId' })
    }
  }
  Store.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    userId : DataTypes.INTEGER,
    code : DataTypes.STRING,
    phoneNumber : DataTypes.STRING,
    img : DataTypes.STRING,
    address : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};