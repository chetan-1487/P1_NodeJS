const {DataTypes} = require('sequelize');
const sequelize = require("../db")

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    User_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user",
    },
  },
  {
    // Other model options go here
    tableName: "users"
  },
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); true

module.exports= User