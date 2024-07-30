'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({workspace,user}) {
      this.belongsTo(user,{
        foreignKey : 'userId',
        as : 'user_task'
      })

      this.belongsTo(user,{
        foreignKey : 'userId',
        as : 'user_assignment'
      })
      
      this.belongsTo(workspace)
    }
  }
  task.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    status : DataTypes.STRING,
    workspaceId: DataTypes.INTEGER,
    description : DataTypes.STRING,
    dueDate : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};