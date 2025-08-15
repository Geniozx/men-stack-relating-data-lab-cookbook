const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  expiration: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Fruit', 'Vegetable', 'Dairy', 'Spice', 'Meats', 'Fish', 'Eggs', 'Grains', 'Legumes', 'Milk', 'Fats', 'Oils', 'Sugar or Sweetener', 'Herbs', 'Sauces', 'Dressing', 'Leavening Agents', 'Thickeners, Stabilizers & Binders'],
    required: true,
  },
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
  pantry: [foodSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
