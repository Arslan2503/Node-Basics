const express = require("express");
const app = express();
const router = require("express").Router();
require("dotenv").config();
var cookieParser = require("cookie-parser");
app.use(cookieParser());
const { signAccessToken, verifyAccessToken } = require("../middleware/tokens");
const controller = require("../controller/controller");

router.get("/", verifyAccessToken, controller.get);
router.post("/login", controller.login);
router.post("/register", controller.register);

// router.get("/login", async (req, res, next) => {
//   const data = await UserService.getAll();
//   if (data != null) {
//     // res.render("../views/login");
//     res.send(data);
//   } else {
//     res.status(200).json({ message: "No Data" });
//   }
// });

// router.get("/resgisterPage", async (req, res, next) => {
//   res.render("../views/resgister");
// });

// router.get("/alluser", async (req, res, next) => {
//   var token = req.cookies.auth;

//   // decode token
//   if (token) {
//     jwt.verify(token, process.env.Secret_Key, function (err, token_data) {
//       if (err) {
//         return res.status(403).send("Not Valid Token");
//       } else {
//         const data = UserService.getAll();
//         if (data != null) {
//           res.send(data);
//         } else {
//           res.status(200).json({ message: "No Data" });
//         }
//       }
//     });
//   } else {
//     return res.status(403).send("No token");
//   }

//   const data = await UserService.getAll();
//   if (data != null) {
//     // res.render("../views/login");
//     res.send(data);
//   } else {
//     res.status(200).json({ message: "No Data" });
//   }
// });

module.exports = router;
