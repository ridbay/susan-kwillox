const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    phone_number: String,
    age: Number,
    password: String,
  },
  { timestamps: {} }
);

module.exports = mongoose.model("User", userSchema);
