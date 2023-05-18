const router = require('express').Router();
const userRoutes = require('./userRoutes');
const avatarRoutes = require('./avatarRoutes');
const pinRoutes = require('./pinRoutes');

router.use('/user', userRoutes);
router.use('/', avatarRoutes );
router.use('/', pinRoutes);

module.exports = router;