const express = require("express");
const passport = require("passport");
const app = express();
require("dotenv").config();
const db = require("./utility/conn");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use("/login", function (req, res) {
//   res.render("../views/login");
// });
app.use("/user", require("./routes/User.js"));

app.listen(process.env.PORT, () =>
  console.log(`server up and running at  ${process.env.PORT}`)
);
