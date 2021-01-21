module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("transactions", {
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
  });
  return Transaction;
};