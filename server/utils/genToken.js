const jwt = require("jsonwebtoken");

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

// const createAccessToken = (payload) => {
//   return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: "15m",
//   });
// };

// const createRefreshToken = (payload) => {
//   return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: "7d",
//   });
// };

module.exports = {
  createActivationToken,
  //   createAccessToken,
  //   createRefreshToken,
};
