'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      action: {
          type: Sequelize.ENUM,
          values: ["recharge", "payment"],
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: false,
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: false,
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: false,
        }
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  }
};