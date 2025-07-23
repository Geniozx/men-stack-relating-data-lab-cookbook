const mongoose = require("mongoose");

// user.js

const foodSchema = new mongoose.Schema({
  // YOU DO: Define properties of food schema
  name: {
    type: String
  }
});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
