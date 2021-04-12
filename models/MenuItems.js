const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  short_description: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  tag: {
    type: String,
  },
});

module.exports = MenuItem = mongoose.model("menuitems", MenuItemSchema);
