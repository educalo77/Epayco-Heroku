const { Transaction, User } = require("../db");
const { getOneByUserId } = require("./balanceControllers");
const getOneUser = require("./userControllers").getOne;

const getAll = () => {
  return new Promise((resolve, reject) => {
    Transaction.findAll({ order: [["id", "ASC"]] })
      .then((users) => {
        if (users.length === 0) {
          return reject({
            error: {
              name: "ApiFindError",
              type: "Users Error",
              errors: [
                {
                  message: "there are no transactions in the database",
                  type: "not found",
                  value: null,
                },
              ],
            },
          });
        }
        resolve(users);
      })
      .catch((err) => reject(err));
  });
};

const createOne = (userId, amount, action) => {
    return new Promise((resolve, reject) => { 
      Transaction.create({ action, amount })
      .then((transaction) => {
        transaction.setUser(userId)
        resolve(transaction)
      })
      .catch((err) =>{
        reject(err)
      });
    });
};

const recharge = (userId, amount)=>{
  return new Promise((resolve,reject)=>{
      getOneByUserId(userId)
      .then((balance)=>{
        balance.available= balance.available + amount;
        balance.save()
        return createOne(userId, amount, "recharge")
      })
      .then((transaction) => {
        resolve(transaction)
      })
      .catch((err) =>{
        reject(err)
      } );
  })
}

const payment = (userId, amount)=>{
  return new Promise((resolve,reject)=>{
      getOneByUserId(userId)
      .then((balance)=>{
        if(balance.available < amount) return reject("No tenes credito suficiente")
        balance.available= balance.available - amount;
        balance.save()
        return createOne(userId, amount, "payment")
      })
      .then((transaction) => {
        resolve(transaction)
      })
      .catch((err) =>{
        reject(err)
      } );
  })
}

const getOne = (id) => {
  return new Promise((resolve, reject) => {
    Transaction.findOne({
      where: { id },
    })
      .then((transaction) => {
        if (!transaction) {
          return reject({
            error: {
              name: "ApiFindError",
              type: "Transaction Error",
              errors: [
                {
                  message: "Transaction does not exist in the database",
                  type: "not found",
                  value: null,
                },
              ],
            },
          });
        }

        resolve(transaction);
      })
      .catch((err) => reject(err));
  });
};

const getAllByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    Transaction.findAll({
      where: { userId },
    })
      .then((transaction) => {
        if (!transaction) {
          return reject({
            error: {
              name: "ApiFindError",
              type: "Transaction Error",
              errors: [
                {
                  message: "Transaction does not exist in the database",
                  type: "not found",
                  value: null,
                },
              ],
            },
          });
        }

        resolve(transaction);
      })
      .catch((err) => reject(err));
  });
};

module.exports = {
  createOne,
  getAll,
  getOne,
  recharge,
  payment,
  getAllByUserId
};
