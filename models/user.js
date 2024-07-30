'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Store,task}) {
      
      this.hasOne(Store,{
        foreignKey : 'userId',
        as : 'user_owned',
      })
      this.hasMany(task,{
        foreignKey : 'userId',
        as : 'user_task'
      })
      
      this.hasMany(task,{
        foreignKey : 'userId',
        as : 'user_assignment'
      })


      this.belongsTo(Store, { 
        foreignKey: 'member_id', 
        as: 'members' })
    }
  }
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    reset_token: DataTypes.STRING,
    profile: DataTypes.STRING,
    member_id : DataTypes.INTEGER,
    exp_token : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};