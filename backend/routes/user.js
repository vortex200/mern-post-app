const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/userController");

const auth = require("../middleware/auth");

router.post("/register", userRouter.register);
router.post("/login", userRouter.login);
router.get("/logout", auth, userRouter.logout);

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    isAuth: true,
    user: req.user,
  });
});

module.exports = router;
