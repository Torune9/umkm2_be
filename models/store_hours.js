'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store_hours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  store_hours.init({
    store_id: DataTypes.INTEGER,
    day_of_week: DataTypes.STRING,
    open_time: DataTypes.TIME,
    closed_time: DataTypes.TIME,
    is_closed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'store_hours',
  });
  return store_hours;
};