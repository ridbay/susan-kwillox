const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: String,
    description: String,
    price: String,
    isAvailable: Boolean,
  },
  { timestamps: {} }
);

module.exports = mongoose.model("Item", itemSchema);
