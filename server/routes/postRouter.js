const express = require("express");
const router = express.Router();

const { multerUploads } = require("../middleware/multer");

const postCtrl = require("../controllers/postsControllers");

const auth = require("../middleware/auth");

router.get("/", postCtrl.getAll);
router.post("/", auth, multerUploads, postCtrl.create);

router.get("/:id", postCtrl.getById);
// Change to PUT
router.post("/:id", auth, multerUploads, postCtrl.updateById);
router.delete("/:id", auth, postCtrl.deleteById);

module.exports = router;
