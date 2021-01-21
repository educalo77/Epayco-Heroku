module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define("balances", {
    available: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: false,
      }
    }
  });

  return Balance;
};