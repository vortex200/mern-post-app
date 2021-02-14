const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

let auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ msg: "No token, authorizaton denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
    User.findById(userId, (err, user) => {
      if (err) res.status(400).json({ msg: "Token is not valid" });

      req.user = user;
      next();
    });
  });
};

module.exports = auth;
