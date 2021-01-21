require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const Pool = require("pg").Pool;

const UserModel = require("./models/user");
const TransactionModel = require("./models/transaction");
const BalanceModel = require("./models/balance");

  const PG_DATABASE = "dtagarr2ddp35";
  const PG_USER = "mlpizxglutumwp";
  const PG_PASSWORD = "9ef203d52ac90ebb47805606e26c32494e19f16ef3507828936d96659362f949";
  const PG_HOST = "ec2-3-211-149-196.compute-1.amazonaws.com";

const sequelize = new Sequelize(PG_DATABASE, PG_USER, PG_PASSWORD, {
    host: PG_HOST,
     dialect: 'postgres',
    
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});
  
// const sequelize = new Sequelize("postgres://mlpizxglutumwp:9ef203d52ac90ebb47805606e26c32494e19f16ef3507828936d96659362f949@ec2-3-211-149-196.compute-1.amazonaws.com:5432/dtagarr2ddp35", "mlpizxglutumwp", "9ef203d52ac90ebb47805606e26c32494e19f16ef3507828936d96659362f949", {
//     host: "ec2-3-211-149-196.compute-1.amazonaws.com",
//     dialect: 'postgres',
//     operatorsAliases: false,
   
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   });

const User = UserModel(sequelize, DataTypes);
const Transaction = TransactionModel(sequelize,DataTypes)
const Balance = BalanceModel(sequelize,DataTypes)

User.hasMany(Transaction);
Transaction.belongsTo(User);

User.hasOne(Balance);
Balance.belongsTo(User);


// const devConfig = {
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     database: process.env.PG_DATABASE
// }
//const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
});



module.exports = {
    conn: sequelize,
    User,
    Transaction,
    Balance,
    pool
};