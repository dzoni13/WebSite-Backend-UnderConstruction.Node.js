const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  party_size: {
    type: String,
  },
  mobile_number: {
    type: String,
  },
});

module.exports = Reservation = mongoose.model("reservation", ReservationSchema);
