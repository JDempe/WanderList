const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Avatar extends Model {}

Avatar.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    avatarsName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatarsImage: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    tableName: "avatars",
  }
);

module.exports = Avatar;
