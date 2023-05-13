const router = require("express").Router();
const { Example } = require("../../models");

// GET discovery page
router.get("/discover", async (req, res) => {
  try {
    //Serves the body of the page aka "discovery-page.hbs" to the container //aka "main.hbs"
    // layout property not necessary since it is default, but included for clarity
    res.render("discovery-page", { layout: "main" });
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
