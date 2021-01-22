'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Transactions, {
      foreignKey: 'userId',
      })
      User.hasOne(models.Balance, {
      foreignKey: 'userId',
    })
    }
  };
  User.init({
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
  }, {
    sequelize,
    modelName: 'User',
  });
    User.prototype.compare = function (pass) {
    return bcrypt.compareSync(pass, this.phone);
  };
  return User;
};