const router = require("express").Router();
const userRoutes = require("./userRoutes");
const avatarRoutes = require("./avatarRoutes");
const pinRoutes = require("./pinRoutes");

router.use("/user", userRoutes);
router.use("/", avatarRoutes);
router.use("/", pinRoutes);

// Catch-all route handler for undefined API routes
router.use((req, res) => {
    res.status(404).json({ error: 'API route not found' });
});

module.exports = router;
