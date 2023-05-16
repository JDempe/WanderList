const express = require('express');
const router = express.Router();
const { Pins } = require('../../models');

// GET route to retrieve all pins
router.get('/pins', async (req, res) => {
    try {
        const pins = await Pins.findAll();
        res.status(200).json(pins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to retrieve a specific pin by ID
router.get('/pins/:id', async (req, res) => {
    try {
        const pin = await Pins.findByPk(req.params.id);
        if (pins) {
            res.status(200).json(pins);
        } else {
            res.status(404).json({ error: 'Pin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST route to create a new pin
router.post('/pins', async (req, res) => {
    try {
        const pins = await Pins.create(req.body);
        res.status(201).json(pins);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT route to update a pin
router.put('/pins/:id', async (req, res) => {
    try {
        const [updated] = await Pins.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedPin = await Pins.findByPk(req.params.id);
            res.status(200).json(updatedPin);
        } else {
            res.status(404).json({ error: 'Pin not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE route to delete a Pin
router.delete('/pins/:id', async (req, res) => {
    try {
        const deleted = await Pins.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ message: 'Pin deleted' });
        } else {
            res.status(404).json({ error: 'Pin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;