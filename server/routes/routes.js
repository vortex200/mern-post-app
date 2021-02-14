const express = require("express");
const router = express.Router();

const multer = require("../utils/multer");

const userRouter = require("./controllers/userController");
const postsRouter = require("./controllers/postsControllers");

const auth = require("./middleware/auth");

router.post("/user/register", userRouter.register);
router.post("/user/login", userRouter.login);
router.get("/user/logout", auth, userRouter.logout);
router.get("/user/auth", auth, userRouter.auth);
router.get("/user/posts", auth, userRouter.getPostsByUserId);

router.get("/posts", postsRouter.getAll);
router.post("/posts", auth, multer.single("image"), postsRouter.create);

router.get("/posts/:id", postsRouter.getById);
// Change to PUT
router.post("/posts/:id", auth, multer.single("image"), postsRouter.updateById);
router.delete("/posts/:id", auth, postsRouter.deleteById);

module.exports = router;
