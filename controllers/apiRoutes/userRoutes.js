const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
    try {
        // verify that there is no user in the database with the provided email
        const userExists = await User.findOne({
            where: {
                email: req.body.email.toLowerCase().trim(),
            }
        });
            
        if (userExists) {
            return res.json({ message: `The user with the provided email "${userExists.email}" already exists. Please try to log in.` });
        }

        // verify that the provided username does not exist in the database.
        const usernameExists = await User.findOne({
            where: {
                username: req.body.username.trim(),
            }
        })

        if (usernameExists) {
            return res.json({ message: `The username "${usernameExists.username}" is already taken. Please choose a different username.` });
        }

        // once all verification steps have been successfully completed, proceed to create the user in the database.
        const result = await User.create({
            username: req.body.username.trim(),
            email: req.body.email.toLowerCase().trim(),
            password: req.body.password.trim(),
        });
        
        res.status(200).json({ message: `Welcome aboard, ${result.username}! Enjoy your journey with us!` });
        
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;