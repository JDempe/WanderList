const sequelize = require("../config/connection");
const { loremIpsum } = require("lorem-ipsum");
const { User, Pins, Avatars } = require("../models");

const userSeedData = require("./userSeedData.json");
const pinSeedData = require("./pinSeedData.json");

const seedDb = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate([
    {
      username: "test1",
      password: "password",
    },
    {
      username: "test2",
      password: "password",
    },
    {
      username: "test3",
      password: "password",
    },
  ]);
  process.exit(0);
};

seedDb();
