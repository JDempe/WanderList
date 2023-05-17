const router = require('express').Router();
const userRoutes = require('./userRoutes');
const avatarRoutes = require('./avatarRoutes');
const destinationRoutes = require('./pinRoutes');

router.use('/user', userRoutes);
router.use('/', avatarRoutes );
router.use('/', destinationRoutes);



module.exports = router;