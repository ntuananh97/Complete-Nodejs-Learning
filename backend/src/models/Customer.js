const mongoose = require("mongoose");

// document's shape of data
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: String,
    phone: String,
    address: String,
    image: String,
    description: String,
  },
  { timestamps: true } // automatically create createdAt and updatedAt fields
);

// handle with db
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
