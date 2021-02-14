const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/userController");

const auth = require("../middleware/auth");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/logout", auth, userCtrl.logout);
router.get("/auth", auth, userCtrl.auth);
router.get("/posts", auth, userCtrl.getPostsByUserId);

module.exports = router;
