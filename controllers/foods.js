// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const { render } = require('ejs');

// router logic will go here - will be built later on in the lab

module.exports = router;

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', {
      foods: currentUser.pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  res.render('foods/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:foodId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.id(req.params.foodId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:foodId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const pantry = currentUser.pantry.id(req.params.foodId);
    res.render('foods/edit.ejs', {
      pantry : pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
})