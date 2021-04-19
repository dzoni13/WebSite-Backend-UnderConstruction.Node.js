const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    short_description: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    },
});

module.exports = Team = mongoose.model("team", TeamSchema);
