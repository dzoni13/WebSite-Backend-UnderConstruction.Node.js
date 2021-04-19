const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Event = require("../../models/Event");

//http://localhost:5000/api/event POST
router.post("/", auth, async (req, res) => {
  try {
    const newItem = new Event({
      title: req.body.title,
      description: req.body.description,
      time: req.body.time,
      date: req.body.date,
      image: req.body.image,
      tag: req.body.tag,
    });
    const event = await newItem.save();
    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//http://localhost:5000/api/event  GET
router.get("/", async (req, res) => {
  try {
    const event = await Event.find();

    if (!event) {
      return res.status(400).json({ msg: "No Event found." });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
  }
});

//http://localhost:5000/api/event/id   PATCH
router.patch("/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  // const allowedUpdates = ["title", "performers", "description", "time", "date"];
  // const isValidOperation = updates.every((update) =>
  //   allowedUpdates.includes(update)
  // );
  //
  // if (!isValidOperation) {
  //   return res.status(400).send({ error: "Invalid updates" });
  // }

  try {
    const event = await Event.findOne({ _id: req.params.id });

    if (!event) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      event[update] = req.body[update];
    });

    await event.save();
    res.send(event);
  } catch (e) {
    res.send(e).status(400);
  }
});

//http://localhost:5000/api/event/id   DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id });

    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
