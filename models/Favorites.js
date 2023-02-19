const mongoose = require("mongoose");
const User = require("./User");

const Favorite = mongoose.model("Favorites", {
  id: String,
  title: String,
  desc: String,
  url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

module.exports = Favorite;
