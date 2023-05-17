const sequelize = require("../config/connection");
const { loremIpsum } = require("lorem-ipsum");
const { User, Pins, Avatars } = require("../models");

const userSeedData = require("./userSeedData.json");
const pinSeedData = require("./pinSeedData.json");
const seedAvatars = require('./seedAvatars');
console.log(seedAvatars); 
const seedDb = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- database synced -----\n');

  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Pins.bulkCreate(pinSeedData, {
    individualHooks: true,
    returning: true,
  });

  await seedAvatars();
  
  console.log("'\n ----- Avatars seeded -----\n");
  process.exit(0);
};

seedDb();
