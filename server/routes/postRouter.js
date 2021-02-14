const express = require("express");
const router = express.Router();

const multer = require("../utils/multer");

const postCtrl = require("../controllers/postsControllers");

const auth = require("../middleware/auth");

router.get("/", postCtrl.getAll);
router.post("/", auth, multer.single("image"), postCtrl.create);

router.get("/:id", postCtrl.getById);
// Change to PUT
router.post("/:id", auth, multer.single("image"), postCtrl.updateById);
router.delete("/:id", auth, postCtrl.deleteById);

module.exports = router;
