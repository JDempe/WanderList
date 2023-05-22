const router = require("express").Router();
const { User, Avatars, Pins } = require("../../models");
const { Op } = require("sequelize");

// router.get("/", (req, res) => {
//   //Serves the body of the page aka "landing-page.hbs" to the container //aka "main.hbs"
//   // layout property not necessary since it is default, but included for clarity
//   res.render("landing-page", {
//     layout: "main",
//     style: "./css/landing-page.css",
//     script: "./js/landing-page.js",
//      //user:res.locals.user
//     });
//});
// GET discovery page

router.get("/discover", async (req, res) => {
  try {
    const pins = await Pins.findAll();

    // Shuffles the pins array using  algorithm
    for (let i = pins.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pins[i], pins[j]] = [pins[j], pins[i]];
    }

    // Limits the rendered output to 20 pins
    const pinsData = pins.slice(0, 20).map((pin) => ({
      pinID: pin.id,
      pinTitle: pin.pinTitle,
      pinDescription: pin.pinDescription,
      pinLocation: pin.pinLocation,
      // take the pin.updatedAt and cut it off at the 4th space and only take the first half
      pinDate : pin.updatedAt ? pin.updatedAt.toString().split(" ").slice(0, 4).join(" ") : pin.updatedAt,
      timestamp: pin.updatedAt,
      pinUserID: pin.user_id,
      pinUsername: "",
      pinAvatar: "",
    }));

    // Take the user ID for each pinsData and find the username that matches the user ID
    for (let i = 0; i < pinsData.length; i++) {
      const userData = await User.findByPk(pinsData[i].pinUserID, {
        attributes: { exclude: ["password"] },
      });
      const user = userData.get({ plain: true });
      pinsData[i].pinUsername = user.username;

      // lookup the avatar src from the user's avatar_id
      const avatarData = await Avatars.findByPk(user.avatar_id);
      const avatar = avatarData.get({ plain: true });
      pinsData[i].pinAvatar = avatar.avatarsImage;
    
    }

    // Renders the js/css/second js/hbs/and pins template for [age]
    res.render("discovery-page", {
      style: "./css/discovery-page.css",
      script: "./js/discovery-page.js",
      scriptSecond: "./js/search-pin.js",
      savedPins: pinsData,
      user: {
        id: req.session.user_id,
        isLoggedIn: req.session.logged_in,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// use a router.get /user to get the user's username and ID, then redirect the page to /user/:username
// go to /user and that will find the session user and redirect to /user/:id
router.get("/pins/user", async (req, res) => {
  try {
    // lookup username by session userId
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true });

    // log in check
    if (!req.session.logged_in) {
      return res.redirect("/");
    }

    res.redirect(`/pins/user/${user.username}`);
  } catch (err) {
    console.error(err);
    // redirect to home page on error
    return res.redirect("/");
  }
});

// go to /editprofile and that will find the session user and redirect to /editprofile/:id
router.get("/editprofile", async (req, res) => {
  try {
    //Serves the body of the page aka "edit-profile.hbs" to the container //aka "main.hbs"
    // layout property not necessary since it is default, but included for clarity
    // lookup username by session userId
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true });

    res.redirect(`/editprofile/${user.username}`);
  } catch (err) {
    console.error(err);
    // redirect to home page on error
    return res.redirect("/");
  }
});

// GET edit profile page
router.get("/editprofile/:username", async (req, res) => {
  try {
    // lookup one user by username
    const userData = await User.findOne({
      where: {
        username: req.params.username,
      },
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true });

    // Pull from session the user's id to confirm that the user is logged in
    const userId = req.session.user_id;
    const userSession = req.session.user_id;
    const userLoggedIn = req.session.logged_in;
    const userExists = await User.findOne({
      where: {
        username: req.params.username,
      },
      attributes: { exclude: ["password"] },
    });

    // verify that the user exists in the database.

    if (!userExists) {
      console.error(
        `The user with the provided username "${req.params.username}" does not exist.`
      );
      return res.redirect("/");
    }

    // verify that the user is logged in and is the same user as the one being updated.
    if (userSession !== userExists.id || userLoggedIn !== 1) {
      return res.status(400).json({
        message: `You are not authorized to edit this user's profile.`,
      });
    }

    // Pull from the avatar table the avatar image location that matches the user's avatar id
    const avatarData = await Avatars.findByPk(user.avatar_id);
    const avatar = avatarData.get({ plain: true });
    // TODO have the avatars be pulled up after render page.

    const avatarList = await Avatars.findAll();
    const avatars = avatarList.map((avatar) => avatar.get({ plain: true }));

    //Serves the body of the page aka "discovery-page.hbs" to the container //aka "main.hbs"
    // layout property not necessary since it is default, but included for clarity
    res.render("user-profile", {
      layout: "main",
      style: "./css/user-profile.css",
      script: "./js/user-profile.js",
      avatar,
      avatars,
      user: {
        ...user,
        id: req.session.user_id,
        isLoggedIn: req.session.logged_in,
      },
    });
  } catch (err) {
    res.status(404).json(user);
  }
});

// GET user page
router.get("/pins/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { page = 1 } = req.query; // Get the page number from the query parameters

    const limit = 10; // Number of pins per page
    const offset = (page - 1) * limit; // Calculate the offset based on the page number

    const user = await User.findOne({
      where: {
        username: username,
      },
      attributes: { exclude: ["password"] },
    });
    
    const pins = await Pins.findAndCountAll({
      where: { user_id: user.id },
      limit,
      offset,
    });

// get the pinTitle and pinDescription from pins and put it into pinsData
    const pinsData = pins.rows.map((pin) => ({
      id: pin.id,
      pinTitle: pin.pinTitle,
      pinDescription: pin.pinDescription, 
      pinLocation: pin.pinLocation,
      // take the pin.updatedAt and cut it off at the 4th space and only take the first half
      pinDate : pin.updatedAt ? pin.updatedAt.toString().split(" ").slice(0, 4).join(" ") : pin.updatedAt,
    }));


    // Use the saved_pins column json object from user.  break the json object down and take only the pinId and put it into savedPinsData
    const savedPins = user.saved_pins;
    // if they have no savedPins, then skip this part
    if (savedPins) {
    const savedPinsJSON = JSON.parse(savedPins);

    // for each in savedPinsJSON, grab the pinId and put into array
    var savedPinsArray = [];
    for (let i = 0; i < savedPinsJSON.length; i++) {
      savedPinsArray.push(savedPinsJSON[i].pinId);
    }

    // go through each pin in the savedPinsArray and find the pin that matches the pinId and put it into savedPinsData
    var savedPinsData = [];
    for (let i = 0; i < savedPinsArray.length; i++) {
      const pin = await Pins.findByPk(savedPinsArray[i]);
      // map the data to pinTitle, pinDescription, pinLocation, pinDate, timestamp, pinUserID, pinUsername,  pinAvatar
      const pinData = pin.get({ plain: true });
      savedPinsData.push({
        pinID: pinData.id,
        pinTitle: pinData.pinTitle,
        pinDescription: pinData.pinDescription,
        pinLocation: pinData.pinLocation,
        // take the pin.updatedAt and cut it off at the 4th space and only take the first half

        pinDate : pinData.updatedAt ? pinData.updatedAt.toString().split(" ").slice(0, 4).join(" ") : pinData.updatedAt,
        timestamp: pinData.updatedAt,
        pinUserID: pinData.user_id,
        pinUsername: "",
        pinAvatar: "",
      });
    }

    // find the owner of the pinID and get their Username, and Avatar
    for (let i = 0; i < savedPinsData.length; i++) {
      const userData = await User.findByPk(savedPinsData[i].pinUserID, {
        attributes: { exclude: ["password"] },
      });
      const user = userData.get({ plain: true });
      savedPinsData[i].pinUsername = user.username;

      // lookup the avatar src from the user's avatar_id
      const avatarData = await Avatars.findByPk(user.avatar_id);
      const avatar = avatarData.get({ plain: true });
      savedPinsData[i].pinAvatar = avatar.avatarsImage;
    }
  }

    // Renders the js/css/second js/hbs/and pins template for [age]
    res.render("personal-page", {
      style: "./css/personal-page.css",
      script: "./js/personal-page.js",
      scriptSecond: "./js/search-pin.js",
      scriptThird: "./js/discovery-page.js",
      mypins: pinsData,
      savedPins: savedPinsData,
      user: {
        id: req.session.user_id,
        isLoggedIn: req.session.logged_in
      }
      
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router to handle  GET 404 page
// router.use((req, res) => {
//   res.status(404).render('404page', {
//     layout: 'main',
//     style: './css/404.css',
//     title: 'Page Not Found'
//   });
// });
module.exports = router;
