const mongoose = require("mongoose");
const config = require("../utils/config");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: 1,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: config.roles,
    default: "user",
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
