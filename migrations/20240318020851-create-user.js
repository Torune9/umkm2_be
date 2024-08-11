'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique : true,
      },
      password: {
        type: Sequelize.STRING
      },
      reset_token: {
        type: Sequelize.STRING
      },
      exp_token:{
        type : Sequelize.DATE
      },
      profile: {
        type: Sequelize.STRING
      },
      member_id: {
        type : Sequelize.INTEGER
      },
      role : {
        type : Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};