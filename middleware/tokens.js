const { response } = require("express");
const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const User = require("../models/Users");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        iss: userId,
      };
      const secret = process.env.Secret_Key;
      const options = {
        expiresIn: "6h",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const ArraySplit = authHeader.split(" ");
    const token = ArraySplit[1];
    JWT.verify(token, process.env.Secret_Key, async (err, payload) => {
      if (err) {
        if (err.name == "JsonWebTokenError") {
          return response.status(401).send(createError.Unauthorized());
        } else {
          return next(createError.Unauthorized(err.message));
        }
      } else {
        console.log("Authorized User ID is " + payload.iss);
        res.payload = payload;
        next();
      }
    });
  },
};
