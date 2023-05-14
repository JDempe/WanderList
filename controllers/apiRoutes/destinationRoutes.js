const express = require('express');
const router = express.Router();
const {Destinations} = require('../models');

// GET route to retrieve all destinations
router.get('/destinations', async (req, res) => {
    try {
        const destinations = await Destinations.findAll();
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to retrieve a specific destination by ID
router.get('/destinations/:id', async (req, res) => {
    try {
        const destination = await Destinations.findByPk(req.params.id);
        if (destination) {
            res.status(200).json(destination);
        } else {
            res.status(404).json({ error: 'Destination not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST route to create a new destination
router.post('/destinations', async (req, res) => {
    try {
        const destination = await Destinations.create(req.body);
        res.status(201).json(destination);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT route to update a destination
router.put('/destinations/:id', async (req, res) => {
    try {
        const [updated] = await Destinations.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedDestination = await Destinations.findByPk(req.params.id);
            res.status(200).json(updatedDestination);
        } else {
            res.status(404).json({ error: 'Destination not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE route to delete a destination
router.delete('/destinations/:id', async (req, res) => {
    try {
        const deleted = await Destinations.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ message: 'Destination deleted' });
        } else {
            res.status(404).json({ error: 'Destination not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;