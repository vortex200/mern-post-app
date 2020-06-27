const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

const auth = require("../middleware/auth");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userData) => {
    if (err) {
      return res.status(500).json({ success: false, err });
    } else {
      return res.status(200).json({ success: true, user: userData });
    }
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err)
      return res
        .status(400)
        .json({ loginSuccess: false, message: "Auth failed, email not found" });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.status(400).json({
          loginSuccess: false,
          message: "Auth failed, wrong password",
        });

      user.generateToken((err, user) => {
        if (err) return res.status(500).send(err);
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.status(500).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

module.exports = router;
