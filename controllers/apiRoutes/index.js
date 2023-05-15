const router = require('express').Router();
const userRoutes = require('./userRoutes');
const avatarRoutes = require('./avatarRoutes');
const destinationRoutes = require('./pinRoutes');

router.use('/user', userRoutes);
router.use('/user', avatarRoutes );
router.use('/user', destinationRoutes ); 



module.exports = router;