const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
