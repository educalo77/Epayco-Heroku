'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('balances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      available: {
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
    await queryInterface.dropTable('balances');
  }
};