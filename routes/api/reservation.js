const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");

const Reservation = require("../../models/Reservation");

//http://localhost:5000/api/reservation POST
router.post("/", async (req, res) => {
  try {
    const newItem = new Reservation({
      date: req.body.date,
      time: req.body.time,
      party_size: req.body.party_size,
      mobile_number: req.body.mobile_number,
    });
    const reservation = await newItem.save();
    res.json(reservation);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//http://localhost:5000/api/reservation  GET
router.get("/", auth, async (req, res) => {
  try {
    const reservation = await Reservation.find();

    if (!reservation) {
      return res.status(400).json({ msg: "No item found." });
    }
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
