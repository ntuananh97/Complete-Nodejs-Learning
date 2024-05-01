const mongoose = require("mongoose");

// document's shape of data 
const kittySchema = new mongoose.Schema({
  name: String,
});

// handle with db
const Kitten = mongoose.model("Kitten", kittySchema);

module.exports = Kitten

// a new document
// const silence = new Kitten({ name: "Silence" });
// silence.save();
