const User = require("../models/user.model");
const Post = require("../models/post.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { createActivationToken } = require("../utils/genToken");
const sendMail = require("../lib/sendMail");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, err: "Please fill in all fields." });

    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ msg: "This email already exists." });

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { email, password: hashedPassword };
    const activation_token = createActivationToken(newUser);

    const url = `${process.env.DOMAIN}/api/user/activation?token=${activation_token}`;

    sendMail(email, url, "Verify your email address");

    res.status(200).json({
      sucess: true,
      msg: "Register Success! Please activate your email to start.",
    });
  } catch (err) {
    return res.status(500).json({ success: false, err });
  }
};

const activateEmail = async (req, res) => {
  try {
    const activation_token = req.query.token;
    const user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );

    const { email, password } = user;

    const check = await User.findOne({ email });

    if (check)
      return res.status(400).json({ msg: "This email already exists." });

    const newUser = new User({ email, password });
    await newUser.save();

    //res.redirect to login
    res.status(200).json({ msg: "Account has been activated!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, err: "Please fill in all fields." });

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
    const updatedUser = await user.save();

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

// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne(email);

//     if (!user)
//       return res.status(400).json({ msg: "This email does not exist." });

//     const access_token = createAccessToken({ id: user.id });
//     const url = `${CLIENT_URL}/reset_password?token=${access_token}`;

//     sendMail(email, url, "Reset your password");
//     res.json({ msg: "Re-send the password, please check your email." });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// }

// resetPassword: async (req, res) => {
//   try {
//     const { password } = req.body;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const passwordHash = await bcrypt.hash(password, salt);

//     await userQuery.setPasswordByUserId(req.user.id, passwordHash);

//     res.json({ msg: "Password successfully changed!" });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// },

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
  activateEmail,
  login,
  logout,
  auth,
  getPostsByUserId,
};
