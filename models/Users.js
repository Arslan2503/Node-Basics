const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  lname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  email: {
    type: String,
    email: true,
    required: true,
    minlength: 6,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 120,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", schema);
