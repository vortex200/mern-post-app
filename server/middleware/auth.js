const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

let auth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
      return res.status(401).json({ msg: "No token, authorizaton denied" });

    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);

    req.user = user;
    next();
  } catch (err) {
    if (err) res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
