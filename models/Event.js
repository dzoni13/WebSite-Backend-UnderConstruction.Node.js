const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  time: {
    type: String,
  },
  date: {
    type: String,
  },
  image: {
    type: String,
  },
  tag: {
    type: String,
  },
});

module.exports = Event = mongoose.model("event", EventSchema);
