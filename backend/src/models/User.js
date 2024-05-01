const mongoose = require("mongoose");

// document's shape of data 
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
});

// handle with db
const User = mongoose.model("User", userSchema);

module.exports = User


