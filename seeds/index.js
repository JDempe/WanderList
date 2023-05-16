const sequelize = require("../config/connection");
const { loremIpsum } = require("lorem-ipsum");
const { User, Pins, Avatars } = require("../models");

const userSeedData = require("./userSeedData.json");
const pinSeedData = require("./pinSeedData.json");

const seedDb = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Pins.bulkCreate(pinSeedData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDb();
