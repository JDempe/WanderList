const { Pin, User } = require("./index.js");

Pin.findOne({
  where: {
    user_id: '2f05a82c-61ad-4a0a-b3a3-8c650f2de2a5'
  },
  include: User,
})
.then((pinTest) => {
    if (pinTest) {
      const pinTestTitle = pinTitle;
      const userId = pinTest.user_id;
      const username = pinTest.User.id === userId ? pinTest.User.username : null;
      console.log("Pin Title:", pinTitle);
      console.log("User_ID pin table:", userId);
      console.log("Username:", username);
      console.log("id user table", pinTest.User.id);
    } else {
      console.log("No pins found");
    }
  })
  .catch((error) => {
    console.log("Error retrieving pin:", error);
  });