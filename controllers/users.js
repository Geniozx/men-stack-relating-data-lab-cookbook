const express = require("express");
const bcrypt = require("bcrypt"); 
const router = express.Router();
const allUsers = require("../controllers/user.js");
const { render } = require('ejs');

router.get('/users', async (req, res) => {
    const allUsers = await User.Foods.find();
    console.log(allUsers);
    res.render('users/index.ejs', {
      foods: allUsers,
    });
  });