const { Avatars } = require('../models');

const avatarData = [
    {
      avatarsName: 'Avatar1',
      avatarsImage: 'images/avatar1.png',
    },
    {
      avatarsName: 'Avatar2',
      avatarsImage: 'images/avatar2.png',
    },  
    {
        avatarsName: 'Avatar3',
        avatarsImage: 'images/avatar3.png',
      },
      {
        avatarsName: 'Avatar4',
        avatarsImage: 'images/avatar4.png',
      },  

];
  
  const seedAvatars = async () => {
    await Avatars.bulkCreate(avatarData);
  };
  
  module.exports = seedAvatars; 