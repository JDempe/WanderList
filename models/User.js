const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z\s]+$/,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z\s]+$/,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        isLowercase: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 128],
      },
    },
    about_me: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // join avatar and user table
    // each users can have multiple avatars and vice versa.
    avatar_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 51,
      reference: {
        model: "avatars",
        key: "id",
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (userData) => {
        userData.password = await bcrypt.hash(userData.password, 10);
        return userData.password;
      },
      beforeUpdate: async (userData) => {
        userData.password = await bcrypt.hash(userData.password, 10);
        return userData.password;
      },
    },
    sequelize,
    freezeTableName: true,
    modelName: "user",
    timestamps: false,
    underscored: true,
  }
);

// object to test the model. it will be deleted later
// const test = {
//   username: 'olena',
//   email: 'email@email.com',
//   password: 'password',
// }

// User.create(test)
// end of items to delete

module.exports = User;
