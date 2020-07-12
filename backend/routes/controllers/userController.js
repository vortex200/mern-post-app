const User = require("../../models/user.model");
const Post = require("../../models/post.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const register = function (req, res) {
  let email = req.body.email;
  let password;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return res.status(500).json({ success: false, err });

    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) return res.status(500).json({ success: false, err });

      password = hash;

      const newUser = new User({ email, password });

      newUser.save((err, userData) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: false, err });
        } else {
          return res.status(200).json({ success: true });
        }
      });
    });
  });
};

const login = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err || !user)
      return res.status(400).json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (!isMatch)
        return res.status(400).json({
          loginSuccess: false,
          message: "Auth failed, wrong password",
        });

      var token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET);
      user.token = token;
      user.save(function (err, user) {
        if (err)
          return res.status(500).json({
            loginSuccess: false,
            message: "Error saving model",
          });

        res.status(200).json({
          loginSuccess: true,
          token: user.token,
        });
      });
    });
  });
};

const logout = function (req, res) {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.status(500).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
};

const auth = function (req, res) {
  res.status(200).json({
    isAuth: true,
    user: req.user,
  });
};

const getPostsByUserId = function (req, res) {
  const _id = req.user._id.toString();
  Post.find({ createdBy: _id }, (err, result) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json({ result });
    }
  });
};

module.exports = {
  register,
  login,
  logout,
  auth,
  getPostsByUserId,
};
