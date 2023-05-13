const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Pin extends Model {}

Pin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pinDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pinTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pinLocaton: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pinGeocords: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pinCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pinImage: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
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
