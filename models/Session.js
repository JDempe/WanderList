const { Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

// define custom table for user sessions
sequelize.define("Session", {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    expires: Sequelize.DATE,
    data: Sequelize.TEXT,
    user_id: Sequelize.STRING,
    username: Sequelize.STRING,
    logged_in: {
      type: Sequelize.TINYINT(1),
      defaultValue: false,
    },
  });
  
  function extendDefaultFields(defaults, session) {
    return {
      data: defaults.data,
      expires: defaults.expires,
      user_id: session.user_id,
      username: session.username,
      logged_in: session.logged_in,     
    };
  }
  
  module.exports = { extendDefaultFields }; 