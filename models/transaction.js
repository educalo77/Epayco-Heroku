'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    transaction.belongsTo(models.user)
    }
  };
  transaction.init({
    action: {
        type: DataTypes.ENUM,
        values: ["recharge", "payment"],
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: false,
      }
    }
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};