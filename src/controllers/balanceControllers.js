const { Balance } = require("../db");

const getAll = () => {
  return new Promise((resolve, reject) => {
    Balance.findAll({ order: [["id", "ASC"]] })
      .then((balance) => {
        if (balance.length === 0) {
          return reject({
            error: {
              name: "ApiFindError",
              type: "Users Error",
              errors: [
                {
                  message: "there are no balance in the database",
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

const createOne = (userId, available) => {
  return new Promise((resolve, reject) => {   
    Balance.create({available})
      .then((balance) => {
        balance.setUser(userId)
        return balance;
      })
      .then((user) => resolve(user))
      .catch((err) =>{
        console.log(err);
        reject(err)
      } );
  });
};

const editOne = ({ id, available}) => {
  return new Promise((resolve, reject) => {
    getOne(id)
      .then((balance) => {
        balance.available = available;
        return balance.save();
      })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};

const getOne = (id) => {
  return new Promise((resolve, reject) => {
    Balance.findOne({
      where: { id },
    })
      .then((balance) => {
        if (!balance) {
          return reject({
            error: {
              name: "ApiFindError",
              type: "balance Error",
              errors: [
                {
                  message: "balance does not exist in the database",
                  type: "not found",
                  value: null,
                },
              ],
            },
          });
        }
        resolve(user);
      })
      .catch((err) => reject(err));
  });
};
const getOneByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    Balance.findOne({
      where: { userId },
    })
      .then((balance) => {
        if (!balance) {
          return reject({
            error: {
              name: "ApiFindError",
              type: "balance Error",
              errors: [
                {
                  message: "balance does not exist in the database",
                  type: "not found",
                  value: null,
                },
              ],
            },
          });
        }
        resolve(balance);
      })
      .catch((err) => reject(err));
  });
};

module.exports = {
  createOne,
  getAll,
  getOne,
  editOne,
  getOneByUserId
};
