const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");

const Team = require("../../models/Team");

//http://localhost:5000/api/team POST
router.post("/", auth, async (req, res) => {
  try {
    const newItem = new Team({
      name: req.body.name,
      short_description: req.body.short_description,
      image: req.body.image,
    });
    const team = await newItem.save();
    res.json(team);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//http://localhost:5000/api/team  GET
router.get("/", auth, async (req, res) => {
  try {
    const team = await Team.find();

    if (!team) {
      return res.status(400).json({ msg: "No member." });
    }
    res.json(team);
  } catch (err) {
    console.error(err.message);
  }
});

//http://localhost:5000/api/team/id   PATCH
router.patch("/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  // const allowedUpdates = ["name", "short_description", "image"];
  // const isValidOperation = updates.every((update) =>
  //   allowedUpdates.includes(update)
  // );
  //
  // if (!isValidOperation) {
  //   return res.status(400).send({ error: "Invalid updates" });
  // }

  try {
    const team = await Team.findOne({ _id: req.params.id });

    if (!team) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      team[update] = req.body[update];
    });

    await team.save();
    res.send(team);
  } catch (e) {
    res.send(e).status(400);
  }
});

//http://localhost:5000/api/team/id   DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const team = await Team.findOneAndDelete({ _id: req.params.id });

    if (!team) {
      return res.status(404).send();
    }
    res.send(team);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
