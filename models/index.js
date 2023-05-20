// Purpose: Export all models
const Avatars = require("./Avatars");
const Pin = require("./Pins");
const User = require('./User');

User.hasMany(Pin, { foreignKey: 'user_id' });
Pin.belongsTo(User);

module.exports = {
  User,
  Avatars,
  Pin,
};
