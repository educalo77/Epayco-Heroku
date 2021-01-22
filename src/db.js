require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const UserModel = require("./models/user");
const TransactionModel = require("./models/transaction");
const BalanceModel = require("./models/balance");

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
   
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

const User = UserModel(sequelize, DataTypes);
const Transaction = TransactionModel(sequelize,DataTypes)
const Balance = BalanceModel(sequelize,DataTypes)

User.hasMany(Transaction);
Transaction.belongsTo(User);

User.hasOne(Balance)
Balance.belongsTo(User)

module.exports = {
    conn: sequelize,
    User,
    Transaction,
    Balance
};