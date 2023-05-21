const express = require('express');
const router = express.Router();
const {Avatars} = require('../../models');

// Create a new avatar
router.post('/avatars', async (req, res) => {
  try {
    const avatar = await Avatars.create(req.body);
    res.status(201).json(avatar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all avatars
router.get('/avatars', async (req, res) => {
  try {
    const avatars = await Avatars.findAll();
    res.status(200).json(avatars);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a specific avatar by id
router.get('/avatars/:id', async (req, res) => {
  try {
    const avatar = await Avatars.findByPk(req.params.id);
    if (avatar) {
      res.status(200).json(avatar);
    } else {
      res.status(404).json({ error: 'Avatar not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a avatar by id
router.put('/avatars/:id', async (req, res) => {
  try {
    const [updated] = await Avatars.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedAvatar = await Avatars.findByPk(req.params.id);
      res.status(200).json(updatedAvatar);
    } else {
      res.status(404).json({ error: 'Avatar not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a avatar by id
router.delete('/avatars/:id', async (req, res) => {
  try {
    const deleted = await Avatars.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Avatar deleted' });
    } else {
      res.status(404).json({ error: 'Avatar not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;