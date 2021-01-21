const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      set(value) {
        this.setDataValue("name", value.trim().toLowerCase());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: false,
      },
      set(value) {
        this.setDataValue("email", value ? value.trim().toLowerCase() : null);
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
      set(value) {
        if (value) {
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("phone", hash);
        }
      },
    },
    document: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
        set(value) {
          if (value) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue("document", hash);
          }
        },
      },

  });
  User.prototype.compare = function (pass) {
    return bcrypt.compareSync(pass, this.phone);
  };
  return User;
};