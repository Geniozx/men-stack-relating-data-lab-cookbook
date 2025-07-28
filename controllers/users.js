const express = require("express");
const bcrypt = require("bcrypt"); 
const router = express.Router();
const User = require("../models/user.js");

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('users/index', { users });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;


