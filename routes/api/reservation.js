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
            tag: req.body.tag,
            note: req.body.note,
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



//http://localhost:5000/api/reservation/id   PATCH
router.patch("/:id", auth, async (req, res) => {
    console.log("PATCH", req.body);
    const updates = Object.keys(req.body);
    // const allowedUpdates = [
    //   "title",
    //   "short_description",
    //   "description",
    //   "price",
    //   "image",
    //   "tag",
    // ];
    // const isValidOperation = updates.every((update) =>
    //   allowedUpdates.includes(update)
    // );
    //
    // if (!isValidOperation) {
    //   return res.status(400).send({ error: "Invalid updates" });
    // }

    try {
        const reservatione = await Reservation.findOne({ _id: req.params.id });

        if (!reservatione) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            reservatione[update] = req.body[update];
        });

        await reservatione.save();
        res.send(reservation);
    } catch (e) {
        res.send(e).status(400);
    }
});


//http://localhost:5000/api/menuItem/id   DELETE
router.delete("/:id", auth, async (req, res) => {
    try {
        const reservatione = await Reservation.findOneAndDelete({ _id: req.params.id });

        if (!reservatione) {
            return res.status(404).send();
        }
        res.send(reservatione);
    } catch (e) {
        res.status(500).send(e);
    }
});