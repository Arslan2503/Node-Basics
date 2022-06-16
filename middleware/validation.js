const joi = require("joi");

const regSchema = joi.object({
  fname: joi.string().min(3).max(10).required(),
  lname: joi.string().min(3).max(10).required(),
  email: joi.string().min(6).max(30).required().email(),
  password: joi.string().min(6).max(120).required(),
});

const loginSchema = joi.object({
  email: joi.string().min(6).max(30).required().email(),
  password: joi.string().min(6).max(20).required(),
});

module.exports = { regSchema, loginSchema };
