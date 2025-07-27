const express = require("express");
const bcrypt = require("bcrypt"); 
const router = express.Router();
const Users = require("../models/user.js");
const { render } = require('ejs');

router.get('/', async (req, res) => {
    try{
    const users = await User.find({});
    res.render('users/index.ejs', { users });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router