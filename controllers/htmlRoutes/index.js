const router = require("express").Router();
const { User, Avatars } = require("../../models");
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
    const pinsData = pins.slice(0, 20).map(pin => ({
      pinTitle: pin.pinTitle,
      pinDescription: pin.pinDescription,
      pinLocation: pin.pinLocation,
    }));

    // Renders the js/css/second js/hbs/and pins template for [age]
    res.render("discovery-page", {
      style: "./css/discovery-page.css",
      script: "./js/discovery-page.js",
      scriptSecond: "./js/search-pin.js",
      pins: pinsData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/personal", async (req, res) => {
  try {
    //Serves the body of the page aka "personaly-page.hbs" to the container //aka "main.hbs"
    // layout property not necessary since it is defaust, but included for clarity
    res.render("personal-page", {
      style: "./css/personal-page.css",
      script: "./js/personal-page.js",
      scriptSecond: "./js/search-pin.js",
      partials: "personal-pin",
    });
  } catch (err) {
    res.status(404).json(err);
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
    res.status(404).json(err);
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
      return res.status(400).json({
        message: `The user with the provided username "${req.params.username}" does not exist.`,
      });
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
      user,
      avatar,
      avatars,
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

// GET user page
router.get("/user/:id", async (req, res) => {
  try {
    // Get the current user's info
    const userData = await user.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });

    //Serves the body of the page aka "user-page.hbs" to the container //aka "main.hbs"
    res.render("user-page");
  } catch (err) {
    res.status(500).json(err);
  }
});

//router to handle  GET 404 page
// router.use((req, res) => {
//   res.status(404).render('404page', {   
//     layout: 'main',
//     style: './css/404.css',
//     title: 'Page Not Found'
//   });
// });
module.exports = router;