const router = require("express").Router();
const { Example } = require("../../models");

// GET all examples
router.get("/", async (req, res) => {
  try {
    const exampleData = await Example.findAll();
    res.status(200).json(exampleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one example
router.get("/:id", async (req, res) => {
  try {
    const exampleData = await Example.findByPk(req.params.id);
    if (!exampleData) {
      res.status(404).json({ message: "No example found with that id!" });
      return;
    }
    res.status(200).json(exampleData);
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