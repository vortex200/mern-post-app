const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

let auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({ msg: "No token, authorizaton denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findById(decoded, (err, user) => {
      if (!user)
        return res.json({
          isAuth: false,
          error: true,
        });

      req.user = user;
      next();
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
