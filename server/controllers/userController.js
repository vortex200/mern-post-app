const User = require("../models/user.model");
const Post = require("../models/post.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const register = async (req, res) => {
  try {
    if (!req.body.email && !req.body.password)
      return res
        .status(500)
        .json({ success: false, err: "Email or password not provided" });

    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, err });
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.email && !req.body.password)
      return res
        .status(400)
        .json({ success: false, err: "Email or password not provided" });

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        loginSuccess: false,
        message: "Auth failed, wrong password",
      });

    const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET);
    user.token = token;
    const updatedUser = user.save();

    res.status(200).json({
      loginSuccess: true,
      token: updatedUser.token,
    });
  } catch (err) {
    return res.status(500).json({
      loginSuccess: false,
      message: err,
    });
  }
};

const logout = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ success: false, err });
  }
};

const auth = (req, res) => {
  res.status(200).json({
    isAuth: true,
    user: req.user,
  });
};

const getPostsByUserId = async (req, res) => {
  try {
    const _id = req.user._id.toString();

    const posts = await Post.find({ createdBy: _id });

    res.status(200).json({ result: posts });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

module.exports = {
  register,
  login,
  logout,
  auth,
  getPostsByUserId,
};
