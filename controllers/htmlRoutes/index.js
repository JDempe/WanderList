const router = require("express").Router();
const { User, Avatars } = require("../../models");

// GET discovery page
router.get("/discover", async (req, res) => {
  try {
    //Serves the body of the page aka "discovery-page.hbs" to the container //aka "main.hbs"
    // layout property not necessary since it is default, but included for clarity
    res.render("discovery-page", {
      layout: "main",
      style: "./css/discovery-page.css",
    });
  } catch (err) {
    res.status(500).json(err);
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
    res.status(500).json(err);
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
    res.status(500).json(err);
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

// CREATE new example
router.post("/", async (req, res) => {
  try {
    const exampleData = await Example.create(req.body);
    res.status(200).json(exampleData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE example
router.put("/:id", async (req, res) => {
  try {
    const exampleData = await Example.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!exampleData[0]) {
      res.status(404).json({ message: "No example found with that id!" });
      return;
    }
    res.status(200).json(exampleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE example
router.delete("/:id", async (req, res) => {
  try {
    const exampleData = await Example.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!exampleData) {
      res.status(404).json({ message: "No example found with that id!" });
      return;
    }
    res.status(200).json(exampleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
