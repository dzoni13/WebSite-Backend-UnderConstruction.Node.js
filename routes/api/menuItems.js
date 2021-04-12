const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");

const MenuItems = require("../../models/MenuItems");

//http://localhost:5000/api/menuItem POST
router.post("/", auth, async (req, res) => {
  try {
    const newItem = new MenuItem({
      title: req.body.title,
      short_description: req.body.short_description,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      tag: req.body.tag,
    });
    const menuItem = await newItem.save();
    res.json(menuItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//http://localhost:5000/api/menuItem  GET
router.get("/", auth, async (req, res) => {
  try {
    const menuItem = await MenuItem.find();

    if (!menuItem) {
      return res.status(400).json({ msg: "No item found." });
    }
    res.json(menuItem);
  } catch (err) {
    console.error(err.message);
  }
});

//http://localhost:5000/api/menuItem/id   PATCH
router.patch("/:id", auth, async (req, res) => {
  console.log(req.body);
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
    const menuItem = await MenuItem.findOne({ _id: req.params.id });

    if (!menuItem) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      menuItem[update] = req.body[update];
    });

    await menuItem.save();
    res.send(menuItem);
  } catch (e) {
    res.send(e).status(400);
  }
});

//http://localhost:5000/api/menuItem/id   DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const menuItem = await MenuItem.findOneAndDelete({ _id: req.params.id });

    if (!menuItem) {
      return res.status(404).send();
    }
    res.send(menuItem);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/drinks", auth, async (req, res) => {
  try {
    const menuItem = await MenuItem.find({ tag: "drinks" });

    if (!menuItem) {
      return res.status(400).json({ msg: "No item found." });
    }
    res.json(menuItem);
  } catch (err) {
    console.error(err.message);
  }
});
router.get("/appetizers", auth, async (req, res) => {
  try {
    const menuItem = await MenuItem.find({ tag: "appetizers" });

    if (!menuItem) {
      return res.status(400).json({ msg: "No item found." });
    }
    res.json(menuItem);
  } catch (err) {
    console.error(err.message);
  }
});
router.get("/ala_carte", auth, async (req, res) => {
  try {
    const menuItem = await MenuItem.find({ tag: "ala_carte" });

    if (!menuItem) {
      return res.status(400).json({ msg: "No item found." });
    }
    res.json(menuItem);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
