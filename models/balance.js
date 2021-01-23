'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      balance.belongsTo(models.user)
    }
  };
  balance.init({
    available: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: false,
      }
    }
    // userId: {
    //   type: DataTypes.INTEGER,
    //   onDelete: 'CASCADE',
    //   references: {
    //     model: 'User',
    //     key: 'id',
    //     as: 'userId',
    //   }
    // },
  }, {
    sequelize,
    modelName: 'balance',
  });
  return balance;
};