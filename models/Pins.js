const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Pin extends Model {}

Pin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    pinTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pinDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pinLocaton: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pinGeocords: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pinLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pinCategory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pinTag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pinImage: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    tableName: "pins",
  }
);

module.exports = Pin;
