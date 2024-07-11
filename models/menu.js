const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  taste: {
    type: String,
    enum: ["sweet", "sour", "salty"],
  },
  isDrink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

const menu = mongoose.model("Menu", menuSchema);

module.exports = menu;
