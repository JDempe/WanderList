const router = require('express').Router();
const userRoutes = require('./userRoutes');
const avatarRoutes = require('./avatarRoutes');

router.use('/user', userRoutes);
router.use('/user', avatarRoutes );



module.exports = router;