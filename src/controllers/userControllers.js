const { User } = require("../db");
const createOneBalance = require("./balanceControllers").createOne;

const getAll = () => {
  return new Promise((resolve, reject) => {
    User.findAll({ order: [["id", "ASC"]] })
      .then((users) => {
        if (users.length === 0) {
          return reject({
            error: {
              name: "ApiFindError",
              type: "Users Error",
              errors: [
                {
                  message: "there are no users in the database",
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

const createOne = (name, email, phone, document) => {
  return new Promise((resolve, reject) => {   
    User.create({ name, email, phone, document })
      .then((user) =>{
        createOneBalance(user.id,0)
        resolve(user)
      })
      .catch((err) =>{       
        reject(err)
      } );
  });
};

const editOne = ({ id, name, email, phone, document }) => {
  return new Promise((resolve, reject) => {
    getOne(id)
      .then((user) => {
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (document) user.document = document;
        return user.save();
      })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};

const getOne = (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: { id },
    })
      .then((user) => {
        if (!user) {
          return reject({
            error: {
              name: "ApiFindError",
              type: "Users Error",
              errors: [
                {
                  message: "user does not exist in the database",
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

const getOneByEmail = async (email) => {
  try {
    const user = User.findOne({
      where: { email },
    });
    return user;
  } catch (error) {
    return error;
  }
};


const deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    getOne(id)
      .then((user) => {
        user.destroy();

        resolve({ description: "successfully deleted user" });
      })
      .catch((err) => reject(err));
  });
};

module.exports = {
  createOne,
  getAll,
  getOne,
  getOneByEmail,
  editOne,
  deleteOne,
};
