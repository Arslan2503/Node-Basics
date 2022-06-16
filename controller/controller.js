const UserService = require("../services/UserService");
const bcrypt = require("bcrypt");
const { loginSchema, regSchema } = require("../middleware/validation");
const { signAccessToken, verifyAccessToken } = require("../middleware/tokens");

module.exports = {
  register: async (req, res) => {
    const EmailExist = await UserService.getOneByEmail({
      email: req.body.email,
    });
    if (EmailExist) {
      res.status(400).send("Email Already Registered");
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (error) {
      console.log("Error");
    }
    try {
      const result = await regSchema.validateAsync(req.body);
    } catch (error) {
      if (error.isJoi == true) {
        res.status(404).send(error.details[0].message);
        return;
      } else {
        console.log("Error");
      }
    }
    const savedData = await UserService.add(req.body);
    res.status(200).json(savedData);
    const token = await signAccessToken(savedData.data._id);
    console.log(token);

    // res.render("../views/RegisterSuccess");
  },
  login: async (req, res) => {
    const AccountExist = await UserService.FindOneByEmail({
      email: req.body.email,
    });
    if (AccountExist.data == null) {
      res.status(400).send("Email not Registered");
      return;
    } else {
      const checkValidPass = await bcrypt.compare(
        req.body.password,
        AccountExist.data.password
      );

      if (!checkValidPass) {
        res.status(400).send("Invalid Email / Password");
        return;
      }
      const { values, error } = await loginSchema.validateAsync(req.body);
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      } else {
        const token = await signAccessToken(AccountExist.data.id);
        console.log(token);
        // res.render("../views/mainPage");
        res.status(200).json({ message: "Login Successfully", token: token });
      }
    }
  },
  get: async (req, res, next) => {
    const data = await UserService.getAll();
    if (data != null) {
      // res.render("../views/login");
      res.status(200).send(data);
    } else {
      res.status(200).json({ message: "No Data" });
    }
  },
};
