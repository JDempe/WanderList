const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Destinations extends Model {
}


Destinations.init(
   {  
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      destination_name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      destination_description: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      destination_image: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      destination_location: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      destination_link: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      destination_category: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      destination_tag: {
         type: DataTypes.STRING,
         allowNull: true,
      }
   },
   {
      sequelize,
      freezeTableName: true,
      modelName: 'destinations',
      // timestamps: false,
    }
);

module.exports = Destinations;