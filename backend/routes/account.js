const express = require("express");
const router = express.Router();
const accountRouter = require("../controllers/accountControllers");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router
  .route("/")
  .get(accountRouter.getAll)
  .post(upload.single("image"), accountRouter.create);

router
  .route("/:id")
  .get(accountRouter.getById)
  .post(upload.single("image"), accountRouter.createById)
  .delete(accountRouter.deleteById);

module.exports = router;
