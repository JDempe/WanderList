const express = require("express");
const router = express.Router();
const { Pins, User, Avatars } = require("../../models");

// GET route to retrieve all pins
// router.get("/pins", async (req, res) => {
//   try {
//     const pins = await Pins.findAll();
//     res.status(200).json(pins);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// GET route to retrieve a specific pin by pin ID
router.get("/pins/:id", async (req, res) => {
  try {
    const pins = await Pins.findByPk(req.params.id);
    if (pins) {
      res.status(200).json(pins);
    } else {
      res.status(404).json({ error: "Pin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to retrieve a all pins by user ID
router.get("/pins/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1 } = req.query; // Get the page number from the query parameters

    const limit = 10; // Number of pins per page
    const offset = (page - 1) * limit; // Calculate the offset based on the page number

    const pins = await Pins.findAndCountAll({
      where: { user_id: id },
      limit,
      offset,
    });
    // TODO: waiting for place holder for no pin user
    // if (pins.length <= 0) {
    //   res.status(404).json({ error: "No pin is found for this user!" });
    // }

    const pinsData = pins.rows.map((pin) => ({
      pinTitle: pin.pinTitle,
      pinDescription: pin.pinDescription,
      pinLocation: pin.pinLocation,
      pinUsername: pin.user_id,
      id: pin.id,
    }));

    // Take the user ID for each pinsData and find the username that matches the user ID
    for (let i = 0; i < pinsData.length; i++) {
      const userData = await User.findByPk(pinsData[i].pinUsername, {
        attributes: { exclude: ["password"] },
      });
      const user = userData.get({ plain: true });
      pinsData[i].pinUsername = user.username;
    }

    // Renders the js/css/second js/hbs/and pins template for [age]
    res.render("personal-page", {
      style: "./css/personal-page.css",
      script: "./js/personal-page.js",
      scriptSecond: "./js/search-pin.js",
      pins: pinsData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST route to create a new pin and assign pin to the user
router.post("/pins/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const newPins = await Pins.create({
      ...req.body,
      // user_id: req.session.user_id,
      user_id: User.id,
    });
    console.log(User.id);
    const userId = userData.id;
    console.log("!!!!!userData.id!!", userData.id);
    req.session.user_id = userId;
    req.session.save();

    res.status(201).json(newPins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT route to update a pin
router.put("/pins/:id", async (req, res) => {
  try {
    const [updated] = await Pins.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated !== 0) {
      const updatedPin = await Pins.findByPk(req.params.id);
      res.status(200).json(updatedPin);
    } else {
      const existingPin = Pins.findByPk(req.params.id);
      if (existingPin) {
        res.status(200).json({ message: "No update has been made." });
      } else {
        res.status(404).json({ error: "Pin not found" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE route to delete a Pin
router.delete("/pins/:id", async (req, res) => {
  try {
    const pinData = await Pins.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (pinData) {
      res.status(204).json({ message: "Pin deleted" });
    } else {
      res.status(404).json({ error: "Pin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
