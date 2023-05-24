const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: { type: String, unique: true, dropDups: true },
    phone_number: String,
    age: Number,
    password: String,
    role: String,
  },
  { timestamps: {} },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
